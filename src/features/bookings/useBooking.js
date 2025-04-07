import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
    const {bookingId} = useParams();
    // Queries
    const {
        isLoading,
        isError,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false,
    });

    return { isLoading, isError, booking, error };
};

export default useBooking;
