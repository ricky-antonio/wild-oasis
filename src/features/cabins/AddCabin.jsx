import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button $variation="primary" size="medium">
                        Add new cabin
                    </Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
};

export default AddCabin;
