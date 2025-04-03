import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useCabins = () => {
    // Queries
    const {
        isLoading,
        isError,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { isLoading, isError, cabins, error };
};

export default useCabins;
