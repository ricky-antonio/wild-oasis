
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({bookings, confirmedStays, numDays, cabinCount}) => {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, booking) => acc + booking.total_price, 0)
    const checkins = confirmedStays.length;
    console.log(confirmedStays)
    const occupancyRate = confirmedStays.reduce((acc, stay) => acc + stay.num_nights, 0) / (numDays * cabinCount);




  return (
    <>
    <Stat title="Bookings" value={numBookings} color="blue" icon={<HiOutlineBriefcase />} />
    <Stat title="Sales" value={formatCurrency(sales)} color="green" icon={<HiOutlineBanknotes/>} />
    <Stat title="Check Ins" value={checkins} color="indigo" icon={<HiOutlineCalendarDays />} />
    <Stat title="Occupancy Rate" value={`${(occupancyRate * 100).toFixed(2)}%`} color="yellow" icon={<HiOutlineChartBar />} />
  
    </>
  )
}

export default Stats;