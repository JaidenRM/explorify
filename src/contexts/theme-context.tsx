import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { darkTheme } from "../themes/dark";
import GlobalStyle from "../themes/global-styles";
import { lightTheme } from "../themes/light";

interface ThemeHandlers {
    setTheme: (theme: DefaultTheme) => void
    toggleDarkLightTheme: () => void
}

const defaultHandlers: ThemeHandlers = {
    setTheme: () => {},
    toggleDarkLightTheme: () => {},
}

const MyThemeContext = React.createContext<[DefaultTheme, ThemeHandlers]>([
    darkTheme,
    defaultHandlers,
]);

interface ThemeProps {
    withGlobalStyles?: boolean
}

export const MyThemeProvider: React.FC<ThemeProps> = ({
    children, withGlobalStyles = true,
}) => {
    const [theme, setTheme] = React.useState(darkTheme);
    const handlers: ThemeHandlers = {
        setTheme: theme => setTheme(theme),
        toggleDarkLightTheme: () => setTheme(prev => prev.id === 'light' ? darkTheme : lightTheme),
    }

    return (
        <MyThemeContext.Provider value={[theme, handlers]}>
            <ThemeProvider theme={theme}>
                { withGlobalStyles && <GlobalStyle/> }
                { children }
            </ThemeProvider>
        </MyThemeContext.Provider>
    );
}

export const useMyThemeContext = () => React.useContext(MyThemeContext);