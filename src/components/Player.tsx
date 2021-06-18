import SpotifyWebPlayer from "react-spotify-web-playback/lib";

interface PlayerProps {
    accessToken?: string
    hasSaveIcon?: boolean
    songUris?: string[]
}

export const Player: React.FC<PlayerProps> = ({
    accessToken, hasSaveIcon, songUris,
}) => {
    if (!accessToken) return null;

    return (
        <SpotifyWebPlayer
            token={accessToken}
            showSaveIcon={hasSaveIcon}
            uris={songUris || []}
        />
    );
}