import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpotifyApi } from '../../../api/spotify';
import { shuffle } from '../../../utils/collection/shuffle';
import { PlaylistCollection } from './components/playlists';
import { TrackCollection } from './components/tracks';

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface PlaylistScreenProps {
    accessToken?: string
    queueTracks: (tracksUris: string[], overwriteQueue?: boolean) => void
}

export const PlaylistScreen: React.FC<PlaylistScreenProps> = ({
    accessToken, queueTracks,
}) => {
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
    const [trackList, setTrackList] = useState<SpotifyApi.PlaylistTrackObject[]>();
    const [playlistUri, setPlaylistUri] = useState<string>();
    const [playlistUris, setPlaylistUris] = useState<string[]>();

    const onBack = () => {
        setTrackList(undefined);
        setPlaylistUri(undefined);
    }

    const onPlay = (trackUris: string[], startingSong?: string, isShuffle?: boolean) => {
        const uris = isShuffle ? shuffle(trackUris) : trackUris;
        queueTracks(uris, true);
    }
    
    useEffect(() => {
        if (!accessToken) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.playlistApi
            .getUserPlaylists(50)
            .then((playlists) => {
                setPlaylists(playlists.data.items);
            });

    }, [accessToken]);

    useEffect(() => {
        if (!accessToken || !playlistUri) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi
            .fetch<SpotifyApi.PlaylistTrackResponse>(playlistUri)
            .then(res => spotifyApi.fetchPages(res.data))
            .then(tracks => setTrackList(tracks));

    }, [accessToken, playlistUri]);

    useEffect(() => {
        if (!accessToken || !playlistUris || playlistUris.length === 0) return;

        // WARNING: Increased risk of being rate-limited
        // Here we hit all the endpoints since there isn't 1 AFAIK
        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.fetchAll<SpotifyApi.SinglePlaylistResponse>(playlistUris)
            .then(tracks => {
                const pages = tracks.map(track => track.data.tracks);
                return spotifyApi.fetchAllPages(pages);
            })
            .then(pages => {
                const flatTracks = pages.flatMap(track => track);
                const shuffledUris = shuffle(flatTracks.map(track => track.track.uri));
                queueTracks(shuffledUris, true);
            });

    }, [accessToken, playlistUris, queueTracks]);

    return (
        <OuterWrapper>
            {!trackList && 
                <PlaylistCollection 
                    playlists={playlists}
                    onPlaylistClick={uri => setPlaylistUri(uri)}
                    onPlaylistShuffle={uris => setPlaylistUris(uris)}
                />}
            {trackList && 
                <TrackCollection 
                    tracks={trackList}
                    onBack={onBack}
                    onPlay={onPlay}
                />}
        </OuterWrapper>
    );
}