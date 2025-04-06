import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
            // : {field: "total_price", value: 5000, method: "lte"}


    // Sort
    const sortByRaw = searchParams.get("sortBy") || "start_date-desc"
    const [field, direction] = sortByRaw.split("-");

    const sortBy = {field, direction}

    const {
        isLoading,
        isError,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });
    return { bookings, isLoading, error, isError };
};

export default useBookings;
