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
import useModal from '/src/hooks/useModal';
import ModalContext from '../../context/modal';
import { useContext } from 'react';

const WebHeader = () => {
  const { isLogged, logout } = useAuth();
  const openCustomModal = useModal();
  const modalContext = useContext(ModalContext);
  
  const login = () => {
    modalContext(LoginForm);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WebMenu />
          {!isLogged ?
            <Box sx={{ flexGrow: 0 }}>
              <IconButton size='large' color="white" onClick={login} sx={{ p: 0}}>
                <Icon fontSize='large'>login</Icon>
              </IconButton>
            </Box>
            :
            <UserThumbnail func={logout}/>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WebHeader;