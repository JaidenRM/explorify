import styled from "styled-components";

export const PrimaryInput = styled.input`
    padding: 0.65rem;
    font-size: 1rem;
    border-radius: 1.25rem;
    border: 1px solid ${ ({ theme }) => theme.palette.text };

    &:focus {
        outline: none;
        box-shadow: 0 0 1px 2px ${ ({ theme }) => theme.palette.primary.bg } inset;
        border-color: ${ ({ theme }) => theme.palette.primary.bg };
    }
`;