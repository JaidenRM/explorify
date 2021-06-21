import styled from "styled-components";

const OuterWrapper = styled.div`
`;

const StyledImage = styled.img`
    height: 100%;
    width: 100%;
`;

const StyledTitle = styled.h2`

`;

const StyledText = styled.span`

`;

interface PlaylistProps {
    imgUri: string
    name: string
    description: string
}

export const Playlist: React.FC<PlaylistProps> = ({
    imgUri, name, description,
}) => {
    return (
        <OuterWrapper>
            <StyledImage src={imgUri} alt="Playlist cover art" />
            <StyledTitle>{name}</StyledTitle>
            <StyledText>{description}</StyledText>
        </OuterWrapper>
    );
}