import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings";

const useDeleteBooking = () => {
    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("Booking successfully deleted!");

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteBooking };
};

export default useDeleteBooking;
