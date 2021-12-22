import styled from "styled-components";
import { useMyThemeContext } from "../../../contexts/theme-context";
import { PrimaryButton } from "../../../ui/shared/buttons/primary";
import { capitaliseFirstLetter } from "../../../utils/string";

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

interface TopMenuProps {
  logoutFn?: () => void
}

export const TopMenu: React.FC<TopMenuProps> = ({ logoutFn }) => {
    const [theme, { toggleDarkLightTheme }] = useMyThemeContext();

    return (
      <StyledMenu>
        <PrimaryButton onClick={toggleDarkLightTheme}>
            {capitaliseFirstLetter(theme.id)}
        </PrimaryButton>
        { logoutFn && (
          <PrimaryButton onClick={logoutFn}>
              Logout
          </PrimaryButton>
        )}
      </StyledMenu>
    );
}