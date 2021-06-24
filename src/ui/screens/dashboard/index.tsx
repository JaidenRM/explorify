import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { SpotifyPlayer } from "../../../components/player";
import { TopMenu } from "../../../components/nav/top-menu";
import { WithLayout } from "../../../hoc/withLayout";
import { Home } from "../../../ui/screens/home";
import { SideMenu } from "../../../components/nav/side-menu";
import { useCallback, useState } from "react";
import { PlaylistScreen } from "../playlists";

const OuterWrapper = styled.div`
    width: 100%;
    margin: auto;
    text-align: center;
`;

const ErrorWrapper = styled.div`
    color: #990606;
`;

interface DashboardProps {
    code: string
}

export const Dashboard: React.FC<DashboardProps> = ({
    code
}) => {
    const { accessToken, isLoading, error } = useAuth(code);
    const [trackUris, setTrackUris] = useState<string[]>();
    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const addTrackToQueue = (trackUri: string) => {
        setTrackUris(currentTracks => currentTracks ? 
            [...currentTracks, trackUri] : 
            [trackUri]);
    }

    const queueTracks = useCallback((trackUris: string[], overwriteQueue?: boolean) => {
        setTrackUris(queue => {
            if (overwriteQueue) return trackUris;

            return [...queue || [], ...trackUris];
        });
    }, [])

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
                <WithLayout
                    TopMenu={<TopMenu />}
                    SideMenu={
                        <SideMenu 
                            activeMenuItem={activeMenuItem}
                            setActiveMenuItem={setActiveMenuItem}
                        />}
                    BotPlayer={
                        <SpotifyPlayer
                            accessToken={accessToken}
                            hasSaveIcon
                            songUris={trackUris}
                        />}
                >
                    {activeMenuItem === 0 && 
                        <Home 
                            accessToken={accessToken} 
                            addTrackToQueue={addTrackToQueue}    
                        />}
                    {activeMenuItem === 1 && 
                        <PlaylistScreen 
                            accessToken={accessToken}
                            queueTracks={queueTracks}
                        />}
                </WithLayout> 
            }
        </OuterWrapper> 
    );
}