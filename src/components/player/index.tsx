import { useEffect, useState } from "react";
import SpotifyWebPlayer, { STATUS } from "react-spotify-web-playback/lib";

interface SpotifyPlayerProps {
  accessToken?: string;
  hasSaveIcon?: boolean;
  songUris?: string[];
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  accessToken,
  hasSaveIcon,
  songUris,
}) => {
  const [play, setPlay] = useState(false);
  const [playerToken, setPlayerToken] = useState(accessToken);

  useEffect(() => {
    if (accessToken && songUris) setPlay(true);
  }, [songUris, accessToken]);

  if (!playerToken) return null;

  return (
    <SpotifyWebPlayer
      token={playerToken}
      showSaveIcon={hasSaveIcon}
      uris={songUris}
      magnifySliderOnHover
      name="Explorify"
      play={play}
      callback={(state) => {
        setPlay(state.isPlaying);

        if (
          state.status === STATUS.ERROR &&
          state.errorType === "authentication_error"
        ) {
          console.log("AUTH ERROR");
          // Player messes up if I assign before it asks
          setPlayerToken(accessToken);
        }
      }}
    />
  );
};
