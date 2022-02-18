import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Button, Icon } from '@mui/material';

import { getCookieJson } from '/src/utils/cookie';

const LegalContext = React.createContext({});

const style = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  m: 3,
  p: 2,
};

export function LegalContextProvider({ children }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(!!getCookieJson('cookiesAccepted'));

  const handleCookieAccept = () => {
    setCookiesAccepted(true);
    document.cookie = "cookiesAccepted=true;max-age=" + 60*60*24*365*10;
  };

  return (
    <LegalContext.Provider value={{ cookiesAccepted, setCookiesAccepted }}>
      {children}
      <Outlet />
      {!cookiesAccepted && (
        <Box sx={style}>

          <h2><Icon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }}>cookie</Icon> We use cookies</h2>
          <p>We use cookies to improve your experience on our website.</p>
          <p>To use the website, please accept the usage of cookies by clicking the button below.</p>
          <p>Read our <a href="#" onClick={() => console.log('adsf')}>Cookie Privacy Policy.</a></p>
          <Button onClick={handleCookieAccept}>OK</Button>
        </Box>
      )}
    </LegalContext.Provider>
  );
}

export default LegalContext;
