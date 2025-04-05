import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

const useBookings = () => {
    const {
        isLoading,
        isError,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings,
    });
    return { bookings, isLoading, error, isError };
};

export default useBookings;
