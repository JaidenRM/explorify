import styled from "styled-components";
import { PrimaryButton } from "../ui/shared/buttons/primary-btn";

const StyledMenu = styled.div`
  width: 100vw;
  height: 2.5rem;
`;

const FloatRightWrapper = styled.div`
  float: right;
  position: relative;
  z-index: 69;
  margin-right: 1rem;
  margin-top: 1rem;
`;

interface TopMenuProps {
    onThemeToggle: () => void
    currentTheme: string
}

export const TopMenu: React.FC<TopMenuProps> = ({
    onThemeToggle, currentTheme,
}) => {
    return (
        <StyledMenu>
            <FloatRightWrapper>
            <PrimaryButton onClick={onThemeToggle}>
                {currentTheme}
            </PrimaryButton>
            </FloatRightWrapper>
        </StyledMenu>
    );
}