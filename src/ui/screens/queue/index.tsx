import { useEffect, useState } from "react";
import styled from "styled-components";
import { SpotifyApi } from '../../../api/spotify';
import { TitleOnLine } from "../../shared/titles/title-on-line";
import { QueueItem } from "./components/queue-item";
import { PositionWrapper, ImageWrapper, TrackArtistWrapper, AlbumWrapper, DurationWrapper } from "./index.styles";

interface QueueScreenProps {
    trackUris: string[]
    accessToken?: string
}

const QueueWrapper = styled.div``;
const Title = styled.h1``;
const QueueItemHeader = styled.div`
    display: flex;
    flex-direction: row;
    
    & > div {
        padding: 0.5rem 1rem;
    }
`;
const CurrentTrackQueueItem = styled(QueueItem)`
    margin-left: 2rem;
    margin-bottom: 2rem;
    width: calc(100% - 2rem);
`;
const FirstItemWrapper = styled.div`
    margin: 2rem auto;
`;
const LineDivider = styled.hr``;

export const QueueScreen: React.FC<QueueScreenProps> = ({
    trackUris, accessToken
}) => {
    const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();

    useEffect(() => {
        if (!accessToken || !trackUris) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.tracksApi
            .getTracks(trackUris)
            ?.then(res => res.data)
            .then(data => setTracks(data.tracks))
    }, [accessToken, trackUris]);

    if (!tracks) return <h2>Nothing seems to be in queue...</h2>;

    return (
        <QueueWrapper>
            <Title>Queue</Title>
            <QueueItemHeader>
                <PositionWrapper>Position</PositionWrapper>
                <ImageWrapper></ImageWrapper>
                <TrackArtistWrapper>Track</TrackArtistWrapper>
                <AlbumWrapper>Album</AlbumWrapper>
                <DurationWrapper>Time</DurationWrapper>
            </QueueItemHeader>
            {tracks.map((track, index) => {
                if (index === 0)
                    return (
                        <FirstItemWrapper>
                            <TitleOnLine title="Current Track" fontSize="1.5rem" indentation="2rem" />
                            <CurrentTrackQueueItem
                                key={`${index}_${track.id}`}
                                durationMs={track.duration_ms}
                                position={index + 1}
                                artCoverUrl={track.album.images[0].url}
                                artistsNames={track.artists.map(artist => artist.name)}
                                trackName={track.name}
                                albumnName={track.album.name}
                                isActive={true}
                            />
                            <LineDivider />
                        </FirstItemWrapper>
                    );
                    
                return (
                    <QueueItem
                        key={`${index}_${track.id}`}
                        durationMs={track.duration_ms}
                        position={index + 1}
                        artCoverUrl={track.album.images[0].url}
                        artistsNames={track.artists.map(artist => artist.name)}
                        trackName={track.name}
                        albumnName={track.album.name}
                        isActive={false}
                    />
                );
            })}
        </QueueWrapper>
    );
}