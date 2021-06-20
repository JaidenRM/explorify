import styled from "styled-components";

const OuterWrapper = styled.div`
    padding: 1rem 2rem;
`;

const StyledH1 = styled.h1`
    margin-top: 0;
`;

export const SideMenu = () => {
    return (
        <OuterWrapper>
            <StyledH1>Side Menu</StyledH1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                qui officia deserunt mollit anim id est laborum.
            </p>
        </OuterWrapper>
    );
}