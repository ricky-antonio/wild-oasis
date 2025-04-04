import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

const useEditSetting = () => {
    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited!");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateSetting };
};

export default useEditSetting;
