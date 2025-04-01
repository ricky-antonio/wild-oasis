import supabase from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded.");
    }

    return data;
};

export const deleteCabin = (id) => async () => {
    const { error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", id);
    
        if (error) {
            console.log(error);
            throw new Error("Cabin could not be deleted.");
        }
};
