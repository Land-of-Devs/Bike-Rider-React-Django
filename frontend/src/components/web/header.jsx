import * as React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Icon
} from "@mui/material";

import LoginForm from '../global/auth/loginForm';
import WebMenu from './menu';
import UserThumbnail from './thumbnail';
import useAuth from '/src/hooks/useAuth';
import useBooking from '../../hooks/useBooking';
import useModal from '/src/hooks/useModal';

const WebHeader = () => {
  const { isLogged, logout } = useAuth();
  const { getReservation } = useBooking();
  const openCustomModal = useModal();

  const login = () => {
    openCustomModal(LoginForm);
  }

  return (
    <AppBar position="static" sx={{zIndex: 1}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WebMenu />
          {!isLogged ?
            <Box sx={{ flexGrow: 0 }}>
              <IconButton size='large' color="white" onClick={login} sx={{ p: 0 }}>
                <Icon fontSize='large'>login</Icon>
              </IconButton>
            </Box>
            :
            <UserThumbnail
              logout={logout}
              reservation={getReservation}
            />
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WebHeader;
