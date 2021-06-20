import React, { useState } from 'react';
import { Login } from './ui/screens/login';
import { useEffect } from 'react';
import { Dashboard } from './ui/screens/dashboard';
import { MyThemeProvider } from './contexts/theme-context';
import styled from 'styled-components';

const OuterWrapper = styled.div`

`;

const App = () => {
  const [code, setCode] = useState<string>();

  console.log(process.env.REACT_APP_CLIENT_ID);
  console.log(process.env.REACT_APP_AUTH_ROOT_URL);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) setCode(code);
  }, []);

  return (
    <MyThemeProvider>
      <OuterWrapper>
        { code ? <Dashboard code={code}/> : <Login/> }
      </OuterWrapper>
    </MyThemeProvider>
  );
}

export default App;
