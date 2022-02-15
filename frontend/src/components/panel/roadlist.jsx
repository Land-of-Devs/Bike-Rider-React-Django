import useRoad from "../../hooks/useRoad";
import { Button, ButtonBase, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { forwardRef, useEffect } from "react";
import useModal from '/src/hooks/useModal';

const RoadList = () => {
  const road = useRoad();
  const openCustomModal = useModal();

  useEffect(() => { // First render
    road.getBikes();
  }, []);

  function showTicketsBike(id, tickets) {
    openCustomModal(forwardRef(() => <div>{id}</div>));
  }

  return road.loading ? <div style={{margin: 'auto'}}>
    <CircularProgress></CircularProgress> 
  </div> : <List sx={{width: '100%'}}>
    { 
      road.list.map(({id, last_check, tickets}, k) => {
        let d = new Date(last_check);
        d.setTime((d.getTime() + 60*60*1000));
        return (<ButtonBase onClick={() => showTicketsBike(id, tickets)} sx={{width: '100%'}} key={k}><ListItem>
          <ListItemText primary={`ID: ${id}`} secondary={`Last check: ${d.toLocaleString()}`} />
        </ListItem></ButtonBase>) 

        }
      )
    }
  </List>
};

export default RoadList;