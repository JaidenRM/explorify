import styled from "styled-components";
import { SearchTrackItem } from "./components/search-track-item";
import { AlbumWrapper, DurationWrapper, ImageWrapper, RankingWrapper, TrackArtistWrapper } from "./index.styles";

interface TracklistProps {
    tracks: SpotifyApi.TrackObjectFull[]
    onTrackSelected?: (trackUri: string) => void
}

const OuterWrapper = styled.div`
    width: 100%;
`;
const TrackItemsWrapper = styled.div``;
const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    & > div {
        padding: 0.5rem 1rem;
    }
`;

export const Tracklist: React.FC<TracklistProps> = ({
    tracks, onTrackSelected,
}) => {
    return (
        <OuterWrapper>
            <HeaderWrapper>
                <RankingWrapper>#</RankingWrapper>
                <ImageWrapper></ImageWrapper>
                <TrackArtistWrapper>Track</TrackArtistWrapper>
                <AlbumWrapper>Album</AlbumWrapper>
                <DurationWrapper>Time</DurationWrapper>
            </HeaderWrapper>
            <TrackItemsWrapper>
                {tracks.map((track, index) => (
                    <SearchTrackItem
                        key={index}
                        ranking={index + 1}
                        artCoverUrl={track.album.images[0].url}
                        artistsNames={track.artists.map(artist => artist.name)}
                        trackName={track.name}
                        durationMs={track.duration_ms}
                        albumnName={track.album.name}
                        onClick={() => {
                            if (onTrackSelected) onTrackSelected(track.uri);
                        }}
                    />
                ))}
            </TrackItemsWrapper>
        </OuterWrapper>
    );
}