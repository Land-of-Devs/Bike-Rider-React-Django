import { ButtonBase, Icon, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import BikeView from "./bikeview";
import TicketList from "./ticketlist";
import useModal from "/src/hooks/useModal";

export const BikeList = ({ bikes, onTicketClosed = null }) => {
  const openCustomModal = useModal();

  function showBike(bike) {
    openCustomModal(BikeView, { bike, onClose: onTicketClosed });
  }

  function showTicketsBike(id, tickets) {
    openCustomModal(TicketList, { tickets, onClose: onTicketClosed });
  }

  return (
    <List sx={{ width: '100%' }}>
      {
        bikes.map((bike, k) => {
          let d = new Date(bike.last_check);
          d.setTime((d.getTime() + 60 * 60 * 1000));
          return (
            <ListItem
              sx={{ width: '100%', mr: 6 }}
              disablePadding
              key={k}
              secondaryAction={
                <ListItemButton
                  onClick={() => showTicketsBike(bike.id, bike.maintenance_ticket)}
                  title="View Tickets"
                >
                  <Icon color="primary">confirmation_number</Icon>
                  <Typography>({bike.maintenance_ticket.length})</Typography>
                </ListItemButton>
              }
            >
              <ListItemButton
                onClick={() => showBike(bike)}
              >
                <ListItemText primary={`ID: ${bike.id}`} secondary={`Last check: ${d.toLocaleString()}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      }
    </List>
  );
}
