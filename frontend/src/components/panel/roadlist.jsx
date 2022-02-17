import useRoad from "../../hooks/useRoad";
import { Button, ButtonBase, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { forwardRef, useEffect } from "react";
import useModal from '/src/hooks/useModal';
import TicketList from "./modals/ticketlist";

const RoadList = () => {
  const road = useRoad();
  const openCustomModal = useModal();

  useEffect(() => { // First render
    road.getBikes();
  }, []);

  function showTicketsBike(id, tickets) {
    openCustomModal(TicketList, {tickets});
  }

  return road.loading ? <div style={{margin: 'auto'}}>
    <CircularProgress></CircularProgress> 
  </div> : <List sx={{width: '100%'}}>
    { 
      road.list.map(({id, last_check, maintenance_ticket}, k) => {
        let d = new Date(last_check);
        d.setTime((d.getTime() + 60*60*1000));
        return (<ButtonBase onClick={() => showTicketsBike(id, maintenance_ticket)} sx={{width: '100%'}} key={k}><ListItem>
          <ListItemText primary={`ID: ${id}`} secondary={`Last check: ${d.toLocaleString()}`} />
        </ListItem></ButtonBase>) 

        }
      )
    }
  </List>
};

export default RoadList;