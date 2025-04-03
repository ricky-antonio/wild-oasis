import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created!");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    });


    return {isCreating, createCabin}
};

export default useCreateCabin;
