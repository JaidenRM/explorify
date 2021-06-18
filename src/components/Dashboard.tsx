import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Player } from "./Player";

const OuterWrapper = styled.div`
    width: 100%;
    margin: auto;
    padding: 2rem;
    text-align: center;
`;

const ErrorWrapper = styled.div`
    color: #990606;
`;

const DashboardWrapper = styled.div`
`;

interface DashboardProps {
    code: string
}

export const Dashboard: React.FC<DashboardProps> = ({
    code
}) => {
    const { accessToken, isLoading, error } = useAuth(code);

    return (
        <OuterWrapper>
            { isLoading && <h1>LOADING...</h1> }
            { error && 
                <ErrorWrapper>
                    <h1>Oops!</h1>
                    <p>We received the following error: </p>
                    <p>{error}</p>
                </ErrorWrapper>}
            { !isLoading && !error && 
                <DashboardWrapper>
                    <h1>DASHBOARD!</h1>
                    <p>Code: { code }</p>
                    <p>Access Token: { accessToken }</p>
                    <Player
                        accessToken={accessToken}
                    />
                </DashboardWrapper> 
            }
        </OuterWrapper> 
    );
}