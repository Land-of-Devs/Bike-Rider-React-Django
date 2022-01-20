import * as React from 'react';
import * as Mui from "@mui/material"
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const WebHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Mui.AppBar position="static">
      <Mui.Container maxWidth="xl">
        <Mui.Toolbar disableGutters>
          <Mui.Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Mui.Typography>

          <Mui.Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Mui.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </Mui.IconButton>
            <Mui.Menu
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Mui.MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Mui.Typography textAlign="center">{page}</Mui.Typography>
                </Mui.MenuItem>
              ))}
            </Mui.Menu>
          </Mui.Box>
          <Mui.Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Mui.Typography>
          <Mui.Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Mui.Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Mui.Button>
            ))}
          </Mui.Box>

          <Mui.Box sx={{ flexGrow: 0 }}>
            <Mui.Tooltip title="Open settings">
              <Mui.IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Mui.Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </Mui.IconButton>
            </Mui.Tooltip>
            <Mui.Menu
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
                <Mui.MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Mui.Typography textAlign="center">{setting}</Mui.Typography>
                </Mui.MenuItem>
              ))}
            </Mui.Menu>
          </Mui.Box>
        </Mui.Toolbar>
      </Mui.Container>
    </Mui.AppBar>
  );
}

export default WebHeader;