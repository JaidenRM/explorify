import { PrimaryButton } from "../../shared/buttons/primary";
import { createSpotifyAuthLink } from "../../../utils/auth/create-auth-link";
import styled from 'styled-components';

const LoginWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    text-align: center;
    position: relative;
`;

const StyledH1 = styled.h1`
    position: absolute;
    top: 10%;
    width: 100%;
    margin: auto;
    left: 0; 
`;

const PrimaryButtonWrapper = styled.div`
    position: absolute;
    width: 100%;
    margin: auto;
    left: 0; 
    bottom: 25%;
`;

export const Login = () => {
    const spotifyAuthLink = createSpotifyAuthLink({});
    const openAuthLinkNewTab = () => window.open(spotifyAuthLink, '_blank')?.focus();

    return (
        <LoginWrapper>
            <StyledH1>Welcome to Explorify</StyledH1>
            <PrimaryButtonWrapper>
                <PrimaryButton onClick={openAuthLinkNewTab}>
                    Login With Spotify
                </PrimaryButton>
            </PrimaryButtonWrapper>
        </LoginWrapper>
    );
};