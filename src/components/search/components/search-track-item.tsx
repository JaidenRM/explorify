import styled from "styled-components";

const OuterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

    & > div {
        padding: 0.5rem 1rem;
    }
`;
const RankingWrapper = styled.div`
    flex: 1 10;
`;
const ImageWrapper = styled.div`
    flex: 1 2;
`;
const TrackArtistWrapper = styled.div`
    flex: 8;
`;
const AlbumWrapper = styled.div`
    flex: 5;
`;
const DurationWrapper = styled.div`
    flex: 1 3;
`;



interface TrackItemProps {
    ranking: number
    artCoverUrl: string
    artistsNames: string[]
    trackName: string
    albumnName: string
    durationMs: number
    onClick?: () => void
}

const convertMsToMinutes = (ms: number) => {
    const roundToTwoPlaces = ms * 100 / (1000 * 60);

    return Math.round(roundToTwoPlaces) / 100;
}

export const SearchTrackItem: React.FC<TrackItemProps> = ({
    ranking, artCoverUrl, artistsNames, trackName, durationMs, albumnName, onClick,
}) => {
    return (
        <OuterWrapper onClick={onClick}>
            <RankingWrapper>
                {ranking}
            </RankingWrapper>
            <ImageWrapper>
                <img src={artCoverUrl} alt="Track art cover" width="100px" height="100px" />
            </ImageWrapper>
            <TrackArtistWrapper>
                <h3>{trackName}</h3>
                <p>{artistsNames.join(", ")}</p>
            </TrackArtistWrapper>
            <AlbumWrapper>
                {albumnName}
            </AlbumWrapper>
            <DurationWrapper>
                {convertMsToMinutes(durationMs)}
            </DurationWrapper>
        </OuterWrapper>
    );
}