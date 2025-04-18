import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

const BookingDetail = () => {
    const { isLoading, isError, booking, error } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const navigate = useNavigate();
    const moveBack = useMoveBack();

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const { status } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{booking.id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button
                        $variation="primary"
                        size="medium"
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                    >
                        Check in
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        $variation="primary"
                        size="medium"
                        disabled={isCheckingOut}
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(booking.id)}
                    >
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button
                            $variation="danger"
                            size="medium"
                            icon={<HiTrash />}
                        >
                            Delete
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={() =>
                                deleteBooking(booking.id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation="secondary" size="medium" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
};

export default BookingDetail;
