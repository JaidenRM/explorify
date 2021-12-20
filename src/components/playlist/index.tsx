import styled from "styled-components";
import { sanitise } from "../../utils/string";

const OuterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledTitle = styled.h2`flex: 1;`;

const StyledText = styled.span`
  word-break: break-word;
`;

interface PlaylistProps {
  imgUri: string;
  name: string;
  description: string;
  onClick: () => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  imgUri,
  name,
  description,
  onClick,
}) => {
  return (
    <OuterWrapper onClick={onClick}>
      <StyledImage src={imgUri} alt="Playlist cover art" />
      <StyledTitle>{sanitise(name)}</StyledTitle>
      <StyledText>{sanitise(description)}</StyledText>
    </OuterWrapper>
  );
};
