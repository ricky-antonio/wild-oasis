import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
    const { logout, isLoading } = useLogout();
    return (
        <ButtonIcon disabled={isLoading} onClick={logout}>
            {isLoading ? (
                <SpinnerMini />
            ) : (
                <>
                    <HiArrowRightOnRectangle /> <span>logout</span>
                </>
            )}
        </ButtonIcon>
    );
};

export default Logout;
