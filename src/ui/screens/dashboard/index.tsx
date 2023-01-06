import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { SpotifyPlayer } from "../../../components/player";
import { TopMenu } from "../../../components/nav/top-menu";
import { WithLayout } from "../../../hoc/withLayout";
import { Home } from "../../../ui/screens/home";
import { SideMenu } from "../../../components/nav/side-menu";
import { useCallback, useState } from "react";
import { PlaylistScreen } from "../playlists";
import { LoadingScreen } from "../loading";
import { QueueScreen } from "../queue";
import { SpotifyPlayerTrack } from "react-spotify-web-playback/lib";

const OuterWrapper = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  color: #990606;
`;

interface DashboardProps {
  code: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ code }) => {
  const { accessToken, isLoading, error, logout } = useAuth(code);
  const [trackUris, setTrackUris] = useState<string[]>();
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<SpotifyPlayerTrack>();

  const addTrackToQueue = (trackUri: string) => {
    setTrackUris((currentTracks) =>
      currentTracks ? [...currentTracks, trackUri] : [trackUri]
    );
  };

  const queueTracks = useCallback(
    (trackUris: string[], overwriteQueue?: boolean) => {
      setTrackUris((queue) => {
        if (overwriteQueue) return trackUris;

        return [...(queue || []), ...trackUris];
      });
    },
    []
  );

  const getTrackUrisForQueue = useCallback(() => {
    if (!currentTrack?.uri || !trackUris) return [];

    const currTrackIndex = trackUris.findIndex(uri => uri === currentTrack.uri);
    if (currTrackIndex < 0) return [];
    
    return trackUris.slice(currTrackIndex, trackUris.length);
  }, [trackUris, currentTrack]);

  return (
    <OuterWrapper>
      {isLoading && <LoadingScreen />}
      {error && (
        <ErrorWrapper>
          <h1>Oops!</h1>
          <p>We received the following error: </p>
          <p>{error}</p>
        </ErrorWrapper>
      )}
      {!isLoading && !error && (
        <WithLayout
          TopMenu={<TopMenu logoutFn={logout} />}
          SideMenu={
            <SideMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
            />
          }
          BotPlayer={
            <SpotifyPlayer
              accessToken={accessToken}
              hasSaveIcon
              trackUris={trackUris}
              onTrackChange={setCurrentTrack}
            />
          }
        >
          {activeMenuItem === 0 && (
            <Home accessToken={accessToken} addTrackToQueue={addTrackToQueue} />
          )}
          {activeMenuItem === 1 && (
            <PlaylistScreen
              accessToken={accessToken}
              queueTracks={queueTracks}
            />
          )}
          {activeMenuItem === 2 && (
            <QueueScreen
              trackUris={getTrackUrisForQueue()}
              accessToken={accessToken}
            />
          )}
        </WithLayout>
      )}
    </OuterWrapper>
  );
};
