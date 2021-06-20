import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { SpotifyPlayer } from "../../../components/player";
import { TopMenu } from "../../../components/nav/top-menu";
import { WithLayout } from "../../../hoc/withLayout";
import { Search } from "../../../components/search";
import { SideMenu } from "../../../components/nav/side-menu";
import { useState } from "react";

const OuterWrapper = styled.div`
    width: 100%;
    margin: auto;
    text-align: center;
`;

const ErrorWrapper = styled.div`
    color: #990606;
`;

interface HomeProps {
    code: string
}

export const Home: React.FC<HomeProps> = ({
    code
}) => {
    const { accessToken, isLoading, error } = useAuth(code);
    const [trackUris, setTrackUris] = useState<string[]>();

    const addTrackToQueue = (trackUri: string) => {
        setTrackUris(currentTracks => currentTracks ? 
            [...currentTracks, trackUri] : 
            [trackUri]);
    }

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
                    SideMenu={<SideMenu />}
                    BotPlayer={
                        <SpotifyPlayer
                            accessToken={accessToken}
                            hasSaveIcon
                            songUris={trackUris}
                        />}
                >
                    <Search 
                        accessToken={accessToken} 
                        onTrackSelected={addTrackToQueue}    
                    />
                </WithLayout> 
            }
        </OuterWrapper> 
    );
}