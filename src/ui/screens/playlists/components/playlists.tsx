import { useState } from "react";
import styled from "styled-components";
import { Playlist } from "../../../../components/playlist";
import { PrimaryButton } from "../../../shared/buttons/primary";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

const OptionsWrapper = styled.div`
  position: sticky;
  top: 0;

  & > * {
    margin: 0rem 2rem;
  }
`;

const EmptyWrapper = styled.div`
  margin: 2rem auto;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PlaylistItemWrapper = styled.div<{ isSelected: boolean }>`
  flex: 0 1 calc(25% - 4rem);
  padding: 1rem;
  margin: 1rem;
  outline: ${({ theme, isSelected }) =>
    isSelected ? `0.25rem solid ${theme.palette.primary.bg}` : ""};
`;

interface PlaylistCollectionProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  onPlaylistClick: (tracksUri: string) => void;
  onPlaylistShuffle: (tracksUris: string[]) => void;
}

export const PlaylistCollection: React.FC<PlaylistCollectionProps> = ({
  playlists,
  onPlaylistClick,
  onPlaylistShuffle,
}) => {
  const [isMultiShuffle, setIsMultiShuffle] = useState(false);
  const [multiIndexes, setMultiIndexes] = useState<number[]>([]);

  const toggleMultiSelected = (index: number) => {
    setMultiIndexes((curr) => {
      if (curr.findIndex((ind) => ind === index) >= 0)
        return curr.filter((i) => i !== index);

      return [...curr, index];
    });
  };

  return (
    <OuterWrapper>
      {!isMultiShuffle && (
        <OptionsWrapper>
          <PrimaryButton onClick={() => setIsMultiShuffle(true)}>
            Multi Shuffle
          </PrimaryButton>
        </OptionsWrapper>
      )}
      {isMultiShuffle && (
        <OptionsWrapper>
          <PrimaryButton
            onClick={() => {
              onPlaylistShuffle(
                multiIndexes.map((index) => playlists[index].href)
              );
              setMultiIndexes([]);
              setIsMultiShuffle(false);
            }}
          >
            Shuffle
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              setMultiIndexes([]);
              setIsMultiShuffle(false);
            }}
          >
            Cancel
          </PrimaryButton>
        </OptionsWrapper>
      )}

      <PlaylistWrapper>
        {(!playlists || playlists.length === 0) && (
          <EmptyWrapper>
            <h2>No playlists found...</h2>
          </EmptyWrapper>
        )}
        {playlists.length > 0 &&
          playlists.map((playlist, index) => (
            <PlaylistItemWrapper
              key={index}
              isSelected={multiIndexes.some((mi) => mi === index)}
            >
              <Playlist
                key={index}
                imgUri={playlist.images[0].url}
                name={playlist.name}
                description={
                  playlist.description ||
                  `by ${playlist.owner.display_name || playlist.owner.id}`
                }
                onClick={() => {
                  if (!isMultiShuffle) onPlaylistClick(playlist.tracks.href);
                  else toggleMultiSelected(index);
                }}
              />
            </PlaylistItemWrapper>
          ))}
      </PlaylistWrapper>
    </OuterWrapper>
  );
};
