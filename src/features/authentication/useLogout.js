import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (data) => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR ", err);
        },
    });

    return { logout, isLoading };
};

export default useLogout;
