import styled from "styled-components";
import { useMyThemeContext } from "../../../contexts/theme-context";
import { PrimaryButton } from "../../../ui/shared/buttons/primary";
import { capitaliseFirstLetter } from "../../../utils/string";

const StyledMenu = styled.div`
  width: 100%;
`;

const FloatRightWrapper = styled.div`
  float: right;
  position: relative;
  z-index: 69;
  margin: 1rem;
`;

export const TopMenu: React.FC = () => {
    const [theme, { toggleDarkLightTheme }] = useMyThemeContext();

    return (
        <StyledMenu>
            <FloatRightWrapper>
              <PrimaryButton onClick={toggleDarkLightTheme}>
                  {capitaliseFirstLetter(theme.id)}
              </PrimaryButton>
            </FloatRightWrapper>
        </StyledMenu>
    );
}