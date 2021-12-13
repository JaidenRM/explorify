import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
    id: 'dark',
    palette: {
        body: '#191414',
        text: '#FFFFFF',
        primary: {
            bg: '#1DB954',
            fg: '#FFFFFF',
        },
    },
    zIndex: {
        menu: 1000
    }
}