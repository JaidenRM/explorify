import { useAuth } from "../hooks/useAuth";

interface DashboardProps {
    code: string
}

export const Dashboard: React.FC<DashboardProps> = ({
    code
}) => {
    const [accessToken, isLoading, error] = useAuth(code);

    return (
        <div>
            { isLoading && <h1>LOADING...</h1> }
            { error && 
                <div>
                    <h1>Oops!</h1>
                    <p>We received the following error: </p>
                    <p>{error}</p>
                </div>}
            { !isLoading && !error && 
                <div>
                    <h1>DASHBOARD!</h1>
                    <p>Code: { code }</p>
                    <p>Access Token: { accessToken }</p>
                </div> }
        </div> 
    );
}