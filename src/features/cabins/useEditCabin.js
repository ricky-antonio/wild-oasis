import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited!");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCabin };
};

export default useEditCabin;
