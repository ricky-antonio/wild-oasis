import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useBookings = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
    // : {field: "total_price", value: 5000, method: "lte"}

    // Sort
    const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    // Pagination
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    // Query
    const {
        isLoading,
        isError,
        data: { data: bookings = [], count = 0 } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Pre fetching
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    return { bookings, count, isLoading, error, isError };
};

export default useBookings;
