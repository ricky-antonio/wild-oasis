import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
    const { error } = await supabase.from("guests").delete().gt("id", 0);
    if (error) console.log(error.message);
}

async function deleteCabins() {
    const { error } = await supabase.from("cabins").delete().gt("id", 0);
    if (error) console.log(error.message);
}

async function deleteBookings() {
    const { error } = await supabase.from("bookings").delete().gt("id", 0);
    if (error) console.log(error.message);
}

async function createGuests() {
    const { error } = await supabase.from("guests").insert(guests);
    if (error) console.log(error.message);
}

async function createCabins() {
    const { error } = await supabase.from("cabins").insert(cabins);
    if (error) console.log(error.message);
}

async function createBookings() {
    // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
    const { data: guestsIds } = await supabase
        .from("guests")
        .select("id")
        .order("id");
    const allGuestIds = guestsIds.map((cabin) => cabin.id);
    const { data: cabinsIds } = await supabase
        .from("cabins")
        .select("id")
        .order("id");
    const allCabinIds = cabinsIds.map((cabin) => cabin.id);

    const finalBookings = bookings.map((booking) => {
        // Here relying on the order of cabins, as they don't have and ID yet
        const cabin = cabins.at(booking.cabin_id - 1);
        const num_nights = subtractDates(booking.end_date, booking.start_date);
        const cabin_price = num_nights * (cabin.regular_price - cabin.discount);
        const extras_price = booking.has_breakfast
            ? num_nights * 15 * booking.num_guests
            : 0; // hardcoded breakfast price
        const total_price = cabin_price + extras_price;

        let status;
        if (
            isPast(new Date(booking.end_date)) &&
            !isToday(new Date(booking.end_date))
        )
            status = "checked-out";
        if (
            isFuture(new Date(booking.start_date)) ||
            isToday(new Date(booking.start_date))
        )
            status = "unconfirmed";
        if (
            (isFuture(new Date(booking.end_date)) ||
                isToday(new Date(booking.end_date))) &&
            isPast(new Date(booking.start_date)) &&
            !isToday(new Date(booking.start_date))
        )
            status = "checked-in";

        return {
            ...booking,
            num_nights,
            cabin_price,
            extras_price,
            total_price,
            guest_id: allGuestIds.at(booking.guest_id - 1),
            cabin_id: allCabinIds.at(booking.cabin_id - 1),
            status,
        };
    });

    console.log(finalBookings);

    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) console.log(error.message);
}

const StyledUploader = styled.div`
        margin-top: auto;
        background-color: var(--color-grey-100);
        padding: 8px;
        border-radius: 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 8px;

        @media (max-width: 900px) {
            display: none;
        }
    `;

function Uploader() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function uploadAll() {
        setIsLoading(true);
        // Bookings need to be deleted FIRST
        await deleteBookings();
        await deleteGuests();
        await deleteCabins();

        // Bookings need to be created LAST
        await createGuests();
        await createCabins();
        await createBookings();

        setIsLoading(false);
        navigate("/")
    }

    async function uploadBookings() {
        setIsLoading(true);
        await deleteBookings();
        await createBookings();
        setIsLoading(false);
        navigate("/")

    }

    return (
        <StyledUploader>
            <Heading as="h3">SAMPLE DATA</Heading>

            <Button
                $variation="primary"
                size="medium"
                onClick={uploadAll}
                disabled={isLoading}
            >
                Upload ALL
            </Button>

            <Button
                $variation="primary"
                size="medium"
                onClick={uploadBookings}
                disabled={isLoading}
            >
                Upload bookings ONLY
            </Button>
        </StyledUploader>
    );
}

export default Uploader;
