import { useEffect, useState } from "react";
import styled from "styled-components";
import { PrimaryInput } from "../../ui/shared/inputs/primary";
import { SpotifyApi } from "../../api/spotify";
import { Tracklist } from "../tracklist";

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
        if (!searchText) {
            setResult(undefined);
            return;
        }
        if (!accessToken) return;

        const spotifyApi = new SpotifyApi(accessToken);
        spotifyApi.searchApi.searchTracks(searchText)
            .then(res => setResult(res.data));
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
                { result && 
                    <Tracklist
                        tracks={result.tracks.items}
                        onTrackSelected={onTrackSelected}
                    />}
            </ResultsWrapper>
        </OuterWrapper>
    );
}