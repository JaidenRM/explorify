import styled from "styled-components";
import { SearchTrackItem } from "../../../../components/search/components/search-track-item";
import { PrimaryButton } from "../../../shared/buttons/primary";

const OuterWrapper = styled.div`
`;

const TracksWrapper = styled.div`
`;

const OptionsWrapper = styled.div`
    width: 100%;
    justify-content: space-evenly;
`;

interface TrackCollectionProps {
    tracks: SpotifyApi.PlaylistTrackObject[]
    onBack: () => void
    onPlay: (uris: string[], startingTrack?: string, shuffle?: boolean) => void
}

export const TrackCollection: React.FC<TrackCollectionProps> = ({
    tracks, onBack, onPlay,
}) => {
    return (
        <OuterWrapper>
            <OptionsWrapper>
                <PrimaryButton onClick={() => onPlay(tracks.map(track => track.track.uri))}>
                    Play All
                </PrimaryButton>
                <PrimaryButton onClick={onBack}>
                    Back
                </PrimaryButton>
            </OptionsWrapper>
            <TracksWrapper>
                {tracks.map((track, index) => (
                    <SearchTrackItem
                        key={index}
                        ranking={index + 1}
                        artCoverUrl={track.track.album.images[0].url}
                        artistsNames={track.track.artists.map(artist => artist.name)}
                        trackName={track.track.name}
                        durationMs={track.track.duration_ms}
                        albumnName={track.track.album.name}
                    />
                ))}
            </TracksWrapper>
        </OuterWrapper>
    );
}