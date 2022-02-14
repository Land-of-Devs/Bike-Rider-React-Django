import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Icon,
  Menu,
  MenuItem,
  Typography,
  Button
} from '@mui/material';
import useAuth from '/src/hooks/useAuth';
import useModal from '/src/hooks/useModal';
import ticketForm from '../global/tickets/ticketForm';

const WebMenu = () => {

  const navigate = useNavigate();
  const openCustomModal = useModal();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {isAdmin, isSupport, isMaintenance, isLogged} = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goPanel = () => {
    navigate('/panel/')
  };

  const goAdmin = () => {
    window.location.href = '/admin/'
  };

  const modalTicket = () => {
    openCustomModal(ticketForm)
  };

  const pages = [
    {name: 'Panel', click: goPanel, access: isSupport || isMaintenance},
    {name: 'Tickets', click: modalTicket, access: isLogged},
    {name: 'Admin', click: goAdmin, access: isAdmin}
  ];

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <Icon>menu</Icon>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {pages.map((page) => page.access && (
            <MenuItem key={page.name} onClick={() => page.click() && handleCloseNavMenu}>
              <Typography textAlign="center" color="white">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => page.access && (
          <Button
            key={page.name}
            onClick={() => page.click() && handleCloseNavMenu }
            sx={{ my: 2, display: 'block' }}
            color="white"
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  )
}

export default WebMenu;
