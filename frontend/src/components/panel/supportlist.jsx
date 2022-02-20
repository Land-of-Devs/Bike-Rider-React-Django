import { Icon, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect } from "react";
import useTickets from "../../hooks/useTickets";
import SendMessage from "./modals/sendmessage";
import TicketView from "./modals/ticketview";
import useModal from "/src/hooks/useModal";

const SupportList = () => {
  const { getSupportTickets, supportTickets } = useTickets();
  const openCustomModal = useModal();

  useEffect(() => {
    getSupportTickets();
  }, []);

  return (
    <List sx={{width: '100%'}}>
      { supportTickets.map((ticket, k) => { 
        let d = new Date(ticket.ticket_head.created_at);
        d.setTime((d.getTime() + 60 * 60 * 1000));

        return (<ListItem sx={{width: '100%', mr: 6}} disablePadding key={k} 
        secondaryAction={
        <ListItemButton onClick={() => openCustomModal(SendMessage, {ticket})} title="Send message">
          <Icon color="primary">mail</Icon>
        
        </ListItemButton>
      }>
        <ListItemButton onClick={() => openCustomModal(TicketView, {ticket})}>
          <ListItemText primary={`ID: ${ticket.ticket_head.id}`} secondary={`Created at: ${d.toLocaleString()}`}></ListItemText>
        </ListItemButton>
      </ListItem>);
      })

      }
    </List>
    
  );
};

export default SupportList;