import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';
import useModal from '../../hooks/useModal';
import LegalInfo from '../global/legalinfo';
import PrivacyTerms from '../global/privacyterms';
import PolicyCookies from '../global/policycookies';

const WebFooter = () => {
  const openCustomModal = useModal();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Team Bike Rider
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          <span color="inherit" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => openCustomModal(LegalInfo)}>
            Legal info
          </span>{' '}
          <span color="inherit" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => openCustomModal(PrivacyTerms)}>
            Privacy terms
          </span>{' '}
          <span color="inherit" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => openCustomModal(PolicyCookies)}>
            Cookie terms
          </span>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}
export default WebFooter;
