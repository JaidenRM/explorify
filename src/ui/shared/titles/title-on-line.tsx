import styled from "styled-components";

interface StylingProps {
    indentation: string
    fontSize: string
}

interface TitleOnLineProps extends StylingProps {
    title: string
}

const Container = styled.div<StylingProps>`
    width: 100%;
    height: ${({ fontSize }) => fontSize};
    position: relative;
    margin: calc(${({ indentation }) => indentation} / 2) auto;
`;
const HorizontalLine = styled.hr`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
`;
const Title = styled.h3<StylingProps>`
    position: absolute;
    font-size: 1.5rem;
    top: calc(${({ indentation }) => indentation} / -2);
    left: ${({ indentation }) => indentation};
    margin: 0;
    padding: 0 1rem;
    background: ${({ theme }) => theme.palette.body};
    z-index: 2;
`;

export const TitleOnLine: React.FC<TitleOnLineProps> = ({
    title, indentation, fontSize
}) => {
    return (
        <Container
            indentation={indentation}
            fontSize={fontSize}
        >
            <HorizontalLine />
            <Title
                indentation={indentation}
                fontSize={fontSize}
            >
                {title}
            </Title>
        </Container>
    );
}