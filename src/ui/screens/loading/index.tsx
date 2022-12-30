import { PropagateLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

const LoadingWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const LoadingScreen = () => {
    const theme = useTheme();

    return (
        <LoadingWrapper>
            <PropagateLoader size={30} color={theme.palette.primary.bg} />
        </LoadingWrapper>
    );
}