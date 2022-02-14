import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Icon
} from "@mui/material";
import { Link } from 'react-router-dom';

const PanelHeader = () => {

  return (
    <Box sx={{zIndex: 1}}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link to="/">
            <IconButton edge="start" color="white" aria-label="menu" sx={{ mr: 2 }}>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit" component="div">
            Panel
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default PanelHeader;
