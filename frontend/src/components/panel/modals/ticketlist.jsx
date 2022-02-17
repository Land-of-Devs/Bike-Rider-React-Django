import { ButtonBase, List, ListItem, ListItemText } from "@mui/material";
import TicketModal from "./ticketview";
import useModal from '/src/hooks/useModal';

const TicketList = ({tickets}) => {
  const openCustomModal = useModal();
  return (
    tickets.length > 0 ? <List sx={{width: '400px', maxHeight: '400px', overflowY: 'auto'}}>
      {
        tickets.map((t, i) => <ButtonBase key={i} sx={{width: '100%'}} onClick={() => openCustomModal(TicketModal, {ticket: t, onClose: () => { openCustomModal(TicketList, {tickets}); } } ) }>
          <ListItem>
            <ListItemText primary={t.ticket_head.title} secondary={t.ticket_head.status}>
            </ListItemText>
          </ListItem></ButtonBase>)
      }
    </List> : 'No tickets'
  );
};

export default TicketList;