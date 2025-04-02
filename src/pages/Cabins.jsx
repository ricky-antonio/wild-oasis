import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Cabins = () => {
    const [showForm, setShowForm] = useState();

    // We can assume by this point that `isSuccess === true`
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>filter / sort</p>
            </Row>
            <Row type="vertical">
                <CabinTable />
                <Button $variation="primary" size="medium" onClick={() => setShowForm((showForm) => !showForm)}>
                    Add new cabin
                </Button>
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
};

export default Cabins;
