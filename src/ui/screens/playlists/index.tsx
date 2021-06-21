import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpotifyApi } from '../../../api/spotify';
import { Playlist } from '../../../components/playlist';

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const PlaylistWrapper = styled.div`
    flex: 0 0 calc(25% - 4rem); // account for margin :)
    margin: 2rem;
`;

interface PlaylistScreenProps {
    accessToken?: string
}

export const PlaylistScreen: React.FC<PlaylistScreenProps> = ({
    accessToken
}) => {
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
    
    useEffect(() => {
        if (!accessToken) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.playlistApi
            .getUserPlaylists(50)
            .then((playlists) => {
                setPlaylists(playlists.data.items);
            });

    }, [accessToken]);

    return (
        <OuterWrapper>
            {(!playlists || playlists.length === 0) && <h2>No playlists found...</h2>}
            {playlists.length > 0 && playlists.map((playlist) => (
                <PlaylistWrapper>
                    <Playlist
                        imgUri={playlist.images[0].url}
                        name={playlist.name}
                        description={playlist.description || `by ${playlist.owner.display_name || playlist.owner.id}`}
                    />
                </PlaylistWrapper>
            ))}
        </OuterWrapper>
    );
}