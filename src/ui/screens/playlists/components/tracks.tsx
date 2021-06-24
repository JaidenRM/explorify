import styled from "styled-components";
import { Tracklist } from "../../../../components/tracklist";
import { PrimaryButton } from "../../../shared/buttons/primary";

const OuterWrapper = styled.div`
    width: 100%;
`;

const TracksWrapper = styled.div`
    padding: 2rem;
`;

const OptionsWrapper = styled.div`
    width: 100%;
    
    & > * {
        margin: 0 2rem;
    }
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
                <Tracklist
                    tracks={tracks.map(track => track.track)}
                />
            </TracksWrapper>
        </OuterWrapper>
    );
}