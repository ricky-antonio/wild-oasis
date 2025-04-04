import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

const Cabins = () => {

    // We can assume by this point that `isSuccess === true`
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>filter / sort</p>
            </Row>
            <Row type="vertical">
                <CabinTable />
                <AddCabin />
            </Row>
        </>
    );
};

export default Cabins;
