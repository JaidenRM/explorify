import { useEffect, useState } from "react";
import styled from "styled-components";
import { PrimaryInput } from "../../ui/shared/inputs/primary";
import { SearchTrackItem } from "./components/search-track-item";
import { SpotifyApi } from "../../api/spotify";

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ResultsWrapper = styled.div`
    flex-grow: 1;
`;

interface SearchProps {
    accessToken?: string
    onTrackSelected?: (trackUri: string) => void,
}

export const Search: React.FC<SearchProps> = ({
    accessToken, onTrackSelected,
}) => {
    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState<SpotifyApi.TrackSearchResponse>();
    
    useEffect(() => {
        if (!searchText) setResult(undefined);
        if (!accessToken) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.searchApi.searchTracks(searchText)
            .then(res => {
                console.log(res);
                setResult(res.data);
            });
    }, [searchText, accessToken]);

    return (
        <OuterWrapper>
            <PrimaryInput
                type="search"
                aria-label="Search for Spotify artists/tracks"
                placeholder="Search for Spotify artists/tracks..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <ResultsWrapper>
                { result && result.tracks.items.map((track, index) => {
                    return (
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
                    );
                })}
            </ResultsWrapper>
        </OuterWrapper>
    );
}