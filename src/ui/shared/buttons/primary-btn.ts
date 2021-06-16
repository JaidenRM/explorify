import styled from 'styled-components';

export const PrimaryButton = styled.button`
    border-radius: 0.75rem;
    background-color: ${ ({ theme }) => theme.palette.primary.bg };
    color: ${ ({ theme }) => theme.palette.primary.fg };
    padding: 1rem 2.5rem;
    text-decoration: none;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;