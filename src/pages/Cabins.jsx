import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Cabins = () => {

    useEffect(() => {
        const cabins = getCabins().then(data => console.log(data));
    }, []);

    return (
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
                <p>test</p>
                <img src="https://ycnvjsqdwpljiftmmehb.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg" alt="" />
        </Row>
    );
};

export default Cabins;
