import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

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
            </Row>
        </>
    );
};

export default Cabins;
