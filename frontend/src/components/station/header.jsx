import { Box, Button, Icon, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import TicketForm from "../global/tickets/ticketForm";

const StationHeader = ({ station }) => {

  const { isLogged, logout } = useAuth();
  const openCustomModal = useModal();
  

  return (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main'}}>
      <Typography ml="50px" component="h1" fontWeight="900" variant="h6" color="white.main">
        Welcome to {station.name}
      </Typography>
      {isLogged &&
        <Box>
          <Button variant="contained" color="error" onClick={() => openCustomModal(TicketForm, {stationID: station.id})}><Icon>note_add</Icon> Notify Issue</Button>
          <Button variant="contained" color="white" sx={{ ml: 1, color: 'primary.dark' }} onClick={logout}><Icon>logout</Icon>Log Out</Button>
        </Box>
      }
    </Box>
  )
}

export default StationHeader;