import React, { useState } from 'react';
import { Login } from './components/Login';
import GlobalStyle from './themes/global-styles';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TopMenu } from './components/TopMenu';

const App = () => {
  const [theme, setTheme] = useState('Dark');
  const [code, setCode] = useState('');
  const toggleTheme = () => setTheme(prev => prev === 'Dark' ? 'Light' : 'Dark');
  const currentTheme = theme === 'Dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) setCode(code);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle/>
      <TopMenu
        onThemeToggle={toggleTheme}
        currentTheme={theme}
      />
      { code ? <Dashboard code={code}/> : <Login/> }
    </ThemeProvider>
  );
}

export default App;
