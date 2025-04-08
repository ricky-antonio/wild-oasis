import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    // Load authenticated user
    const { isLoading, isAuthenticated } = useUser();

    //if no authenticated user, redirect to /login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    // while loading, show spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // if authenticated use, render app
    if (isAuthenticated) return children;
};

export default ProtectedRoute;
