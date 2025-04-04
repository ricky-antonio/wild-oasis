import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
    const [isOpenModal, setIsOpenModal] = useState();

    return (
        <div>
            <Button
                $variation="primary"
                size="medium"
                onClick={() => setIsOpenModal((showForm) => !showForm)}
            >
                Add new cabin
            </Button>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default AddCabin;
