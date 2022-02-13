import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import useModal from '/src/hooks/useModal';
import Coupon from './modals/coupon';
import Reservation from './modals/reservation';
import Subscription from './modals/subscription';

const UserThumbnail = ({ logout, reservation }) => {

  const openCustomModal = useModal();
  
  const settings = [
    { name: 'Reservation', func: () => reservation() && openCustomModal(Reservation) },
    { name: 'Subscription', func: () => openCustomModal(Subscription) },
    { name: 'Coupon', func: () => openCustomModal(Coupon)},
    { name: 'Logout', func: logout }
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
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
          <MenuItem
            key={setting.name}
            onClick={() => {
              setting.func();
              handleCloseUserMenu 
            }}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserThumbnail;