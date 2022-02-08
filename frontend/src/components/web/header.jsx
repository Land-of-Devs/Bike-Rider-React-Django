import * as React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Tooltip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Icon
} from "@mui/material";

import TestModal from '../modal/test';
import CustomMenu from '../global/menu';
import eventBus from '/src/utils/eventBus';
import useAuth from '/src/hooks/useAuth';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const WebHeader = () => {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLogged, logout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const login = () => {
    eventBus.dispatch('modal/open', TestModal)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CustomMenu pages={pages}/>
          {!isLogged ?
            <Box sx={{ flexGrow: 0}}>
              <IconButton onClick={login} sx={{ p: 0 }}>
                <Icon>star</Icon>
              </IconButton>
            </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WebHeader;