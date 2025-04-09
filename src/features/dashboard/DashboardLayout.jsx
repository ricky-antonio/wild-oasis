import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  return (
    <StyledDashboardLayout>
      <div className="">stats</div>
      <div className="">todays activity</div>
      <div className="">chart stay durations</div>
      <div className="">chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
