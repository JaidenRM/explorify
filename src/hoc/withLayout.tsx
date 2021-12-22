import styled from "styled-components";

interface LayoutProps {
    TopMenu?: React.ReactChild
    SideMenu?: React.ReactChild
    BotPlayer?: React.ReactChild
}

const OuterWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    margin: auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const BodyWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
`;

const SideMenuWrapper = styled.div`
    ${ ({ theme }) => `
        flex: 0 0 20%;
        overflow-y: auto;
        box-shadow: 0rem 0.25rem 0.5rem 0 ${ theme.palette.text };
        z-index: ${ theme.zIndex.menu };
        min-width: 150px;
    `
}`;

const TopMenuWrapper = styled.div`
    ${ ({ theme }) => `
        box-shadow: 0.25rem 0 0.5rem 0 ${ theme.palette.text };
        z-index: ${ theme.zIndex.menu };
    `
}`;

const BodyContentWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    text-align: left;
    padding: 2rem;
`;

export const WithLayout: React.FC<LayoutProps> = ({
    TopMenu, SideMenu, BotPlayer, children,
}) => {
    return (
        <OuterWrapper>
            <TopMenuWrapper>
                { TopMenu }
            </TopMenuWrapper>
            <BodyWrapper>
                { SideMenu && 
                    <SideMenuWrapper>
                        { SideMenu}
                    </SideMenuWrapper>}
                <BodyContentWrapper>
                    { children }
                </BodyContentWrapper>
                
            </BodyWrapper>
            { BotPlayer }
        </OuterWrapper>
    );
}