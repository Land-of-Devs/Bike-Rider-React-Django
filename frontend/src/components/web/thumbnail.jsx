import React from 'react';
import {
  Box,
  IconButton,
  Icon,
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

const UserThumbnail = ({ logout, reservation, image, dni }) => {

  const openCustomModal = useModal();

  const settings = [
    { name: 'Reservation', func: () => reservation() && openCustomModal(Reservation), icon: 'book' },
    { name: 'Subscription', func: () => openCustomModal(Subscription), icon: 'local_atm' },
    { name: 'Coupon', func: () => openCustomModal(Coupon), icon: 'confirmation_number' },
    { name: 'Logout', func: logout, icon: 'exit_to_app' }
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
          <Avatar alt={(dni||"G").slice(-1)} title={dni||"Guest"} src={image ? `/api/data/${image||""}` : ''} />
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
            <Icon sx={{verticalAlign: 'middle', mr: 1}}>{setting.icon}</Icon>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserThumbnail;
