import { Search } from "../../../components/search";

interface HomeProps {
    accessToken?: string
    addTrackToQueue: (trackUri: string) => void
}

export const Home: React.FC<HomeProps> = ({
    accessToken, addTrackToQueue,
}) => {
    return (
        <Search 
            accessToken={accessToken} 
            onTrackSelected={addTrackToQueue}
        />
    );
}