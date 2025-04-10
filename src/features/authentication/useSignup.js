import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignup = () => {
    const {mutate: signup, isLoading} = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            console.log(data);
            toast.success("Account successfully created!")
        },
        onError: () => {
            toast.error("This action requires Admin permissions.")
        }
    })

    return {signup, isLoading}
}


export default useSignup;
