import React, { ReactElement, useState } from "react";
import { Login } from "./ui/screens/login";
import { useEffect } from "react";
import { Dashboard } from "./ui/screens/dashboard";
import { MyThemeProvider } from "./contexts/theme-context";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";

const OuterWrapper = styled.div``;

const App = () => {
  const [code, setCode] = useState<string>();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) setCode(code);
  }, []);

  let currentApp: ReactElement;
  if (code) {
    currentApp = (
      <>
        <Dashboard code={code} />
        <Helmet>
          <title>Explorify</title>
          <link rel="canonical" href="https://explorify.jaidenrm.com/" />
        </Helmet>
      </>
    );
  } else {
    currentApp = (
      <>
        <Login />
        <Helmet>
          <title>Explorify - Login</title>
          <link rel="canonical" href="https://explorify.jaidenrm.com/" />
        </Helmet>
      </>
    );
  }

  return (
    <MyThemeProvider>
      <HelmetProvider>
        <OuterWrapper>{currentApp}</OuterWrapper>
      </HelmetProvider>
    </MyThemeProvider>
  );
};

export default App;
