import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded.");
    }

    return data;
};

export const deleteCabin = async (id) => {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted.");
    }
};

export const createEditCabin = async (newCabin, id) => {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

    // create/edit cabin
    let query = supabase.from("cabins");

    //A) create
    if (!id) query = query.insert({ ...newCabin, image: imagePath });

    //B) edit
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be added.");
    }

    //upload image
    if (hasImagePath) return data;
    
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image, {
            cacheControl: "3600",
            upsert: false,
        });

    // delete cabin if there was an error uploading image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error("Image could not be added. Cabin was  not created.");
    }

    return data;
};
