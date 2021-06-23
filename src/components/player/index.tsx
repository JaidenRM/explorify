import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

interface SpotifyPlayerProps {
    accessToken?: string
    hasSaveIcon?: boolean
    songUris?: string[]
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
    accessToken, hasSaveIcon, songUris,
}) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (accessToken && songUris) setPlay(true);

    }, [songUris, accessToken]);

    if (!accessToken) return null;

    return (
        <SpotifyWebPlayer
            token={accessToken}
            showSaveIcon={hasSaveIcon}
            uris={songUris}
            magnifySliderOnHover
            play={play}
            callback={state => {
                if (!state.isPlaying) setPlay(false);
            }}
        />
    );
}