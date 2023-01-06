import styled from "styled-components";
import { AlbumWrapper, DurationWrapper, ImageWrapper, PositionWrapper, TrackArtistWrapper } from "../index.styles";

const OuterWrapper = styled.div<{isActive: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: row;

    & > div {
        padding: 0.5rem 1rem;
    }

    ${({ isActive, theme }) => isActive && `
        background: ${ theme.palette.primary.bg };
    `}
`;

interface QueueItemProps {
    position: number
    artCoverUrl: string
    artistsNames: string[]
    trackName: string
    albumnName: string
    durationMs: number
    isActive: boolean
    className?: string
}

const parseMsToMinsStr = (ms: number): string => {
    const msToSecs = 1000;
    const secsToMins = 60;
    const seconds = Math.round(ms / msToSecs);
    const remainingSeconds = seconds % secsToMins;

    return `${ Math.floor(seconds / secsToMins) }:${ remainingSeconds >= 10 ? remainingSeconds : `0${ remainingSeconds }` }`;
}

export const QueueItem: React.FC<QueueItemProps> = ({
    position, artCoverUrl, artistsNames, trackName, durationMs, albumnName, isActive, className
}) => {
    return (
        <OuterWrapper isActive={isActive} className={className || ""}>
            <PositionWrapper>
                {position}
            </PositionWrapper>
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