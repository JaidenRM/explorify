import styled from "styled-components";

const OuterWrapper = styled.div`
    padding: 1rem 2rem;
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
`;

const StyledListItem = styled.li<{ isActive: boolean }>`
    color: ${ ({ theme, isActive }) => isActive ? theme.palette.primary.bg : 'inherit' };
    margin: 3rem auto;
    font-size: 2rem;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
        cursor: pointer;
    }
`;

interface SideMenuProps {
    activeMenuItem: number
    setActiveMenuItem: (item: number) => void
}

const menuItems = [
    'Home', 'Playlists'
];

export const SideMenu: React.FC<SideMenuProps> = ({
    activeMenuItem, setActiveMenuItem,
}) => {
    return (
        <OuterWrapper>
            <StyledList>
                {menuItems.map((item, index) => {
                    return (
                        <StyledListItem
                            key={index}
                            isActive={index === activeMenuItem}
                            onClick={() => setActiveMenuItem(index)}
                            title={item}
                        >
                            {item}
                        </StyledListItem>
                    );
                })}
            </StyledList>
        </OuterWrapper>
    );
}