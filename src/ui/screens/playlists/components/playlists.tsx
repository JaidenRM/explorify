import { useState } from "react";
import styled from "styled-components";
import { Playlist } from "../../../../components/playlist";
import { PrimaryButton } from "../../../shared/buttons/primary";

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const OptionsWrapper = styled.div`
`;

const PlaylistWrapper = styled.div<{isSelected: boolean}>`
    flex: 0 0 calc(25% - 4rem); // account for margin :)
    margin: 2rem;
    background-color: ${ ({ theme, isSelected }) => isSelected ? theme.palette.primary.fg : 'inherit'};
`;

interface PlaylistCollectionProps {
    playlists: SpotifyApi.PlaylistObjectSimplified[]
    onPlaylistClick: (tracksUri: string) => void
    onPlaylistShuffle: (tracksUris: string[]) => void
}

export const PlaylistCollection: React.FC<PlaylistCollectionProps> = ({
    playlists, onPlaylistClick, onPlaylistShuffle,
}) => {
    const [isMultiShuffle, setIsMultiShuffle] = useState(false);
    const [multiIndexes, setMultiIndexes] = useState<number[]>([]);

    return (
        <OuterWrapper>
            {!isMultiShuffle && 
                <OptionsWrapper>
                    <PrimaryButton onClick={() => setIsMultiShuffle(true)}>
                        Multi Shuffle
                    </PrimaryButton>
                </OptionsWrapper>}
            {isMultiShuffle &&
                <OptionsWrapper>
                    <PrimaryButton onClick={() => {
                        onPlaylistShuffle(multiIndexes.map(index => playlists[index].href));
                        setMultiIndexes([]);
                        setIsMultiShuffle(false);
                    }}>
                        Shuffle
                    </PrimaryButton>
                    <PrimaryButton onClick={() => {
                        setMultiIndexes([]);
                        setIsMultiShuffle(false);
                    }}>
                        Cancel    
                    </PrimaryButton>
                </OptionsWrapper>}
            
            {(!playlists || playlists.length === 0) && <h2>No playlists found...</h2>}
            {playlists.length > 0 && playlists.map((playlist, index) => (
                <PlaylistWrapper isSelected={multiIndexes.some(mi => mi === index)}>
                    <Playlist
                        imgUri={playlist.images[0].url}
                        name={playlist.name}
                        description={playlist.description || `by ${playlist.owner.display_name || playlist.owner.id}`}
                        onClick={() => {
                            if (!isMultiShuffle) onPlaylistClick(playlist.tracks.href);
                            else setMultiIndexes(curr => [...curr, index]);
                        }}
                    />
                </PlaylistWrapper>
            ))}
        </OuterWrapper>
    );
}