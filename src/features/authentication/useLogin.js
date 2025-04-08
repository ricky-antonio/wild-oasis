import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log("ERROR ", err);
            toast.error("Provided email or password are incorrect.");
        },
    });

    return { login, isLoading };
};

export default useLogin;
