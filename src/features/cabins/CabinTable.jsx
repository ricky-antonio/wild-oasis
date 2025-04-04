import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


const CabinTable = () => {
    const { cabins, isLoading, isError, error } = useCabins();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("discount") || "all"
    console.log(filterValue)

    if (isLoading) return <Spinner />;

    if (isError) return <span>Error: {error.message}</span>;

    let filteredCabins;
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0)
        if (filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0)
    
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={filteredCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;
