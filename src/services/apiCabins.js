import supabase from "./supabase";

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

export const createCabin  =  async (newCabin) => {
    const { error } = await supabase
        .from("cabins")
        .insert(newCabin)
        .select();
    
        if (error) {
            console.log(error);
            throw new Error("Cabin could not be added.");
        }
};
