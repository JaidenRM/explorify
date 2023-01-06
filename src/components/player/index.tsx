import { useEffect, useState } from "react";
import SpotifyWebPlayer, { SpotifyPlayerTrack } from "react-spotify-web-playback/lib";

interface SpotifyPlayerProps {
    accessToken?: string
    hasSaveIcon?: boolean
    trackUris?: string[]
    onTrackChange?: (track?: SpotifyPlayerTrack) => void
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
    accessToken, hasSaveIcon, trackUris, onTrackChange
}) => {
    const [play, setPlay] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useState<string>();

    useEffect(() => {
        if (accessToken && trackUris) setPlay(true);

    }, [trackUris, accessToken]);

    if (!accessToken) return null;

    return (
        <SpotifyWebPlayer
            token={accessToken}
            showSaveIcon={hasSaveIcon}
            uris={trackUris}
            magnifySliderOnHover
            name="Explorify"
            play={play}
            callback={state => {
                if (!state.isPlaying) setPlay(false);
                if (state.track.id !== currentTrackId) {
                    if (onTrackChange) onTrackChange(state.track);
                    setCurrentTrackId(state.track.id);
                }
            }}
        />
    );
}