interface DashboardProps {
    code: string
}

export const Dashboard: React.FC<DashboardProps> = ({
    code
}) => {
    return (
        <div>
            <h1>DASHBOARD!</h1>
            <p>Code: { code }</p>
        </div>
    );
}