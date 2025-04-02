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

export const createCabin = async (newCabin) => {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

    // create cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert({ ...newCabin, image: `${imagePath}` })
        .select();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be added.");
    }

    //upload image
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
