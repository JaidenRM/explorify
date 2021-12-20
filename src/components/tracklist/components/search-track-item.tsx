import styled from "styled-components";
import { RankingWrapper, ImageWrapper, TrackArtistWrapper, AlbumWrapper, DurationWrapper } from "../index.styles";

const OuterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

    & > div {
        padding: 0.5rem 1rem;
    }

    ${({ onClick, theme }) => onClick && `
        &:hover {
            cursor: pointer;
            background: ${ theme.palette.primary.bg };
        }
    `}
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

const parseMsToMinsStr = (ms: number): string => {
    const msToSecs = 1000;
    const secsToMins = 60;
    const seconds = Math.round(ms / msToSecs);
    const remainingSeconds = seconds % secsToMins;

    return `${ Math.floor(seconds / secsToMins) }:${ remainingSeconds >= 10 ? remainingSeconds : `0${ remainingSeconds }` }`;
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
                {parseMsToMinsStr(durationMs)}
            </DurationWrapper>
        </OuterWrapper>
    );
}