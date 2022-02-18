import useRoad from "../../hooks/useRoad";
import { Button, ButtonBase, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { forwardRef, useEffect } from "react";
import useModal from '/src/hooks/useModal';
import TicketList from "./modals/ticketlist";
import { BikeList } from "./modals/bikelist";

const RoadList = () => {
  const road = useRoad();

  useEffect(() => { // First render
    road.getBikes();
  }, []);

  return road.loading ? <div style={{ margin: 'auto' }}>
    <CircularProgress></CircularProgress>
  </div> : (
    <BikeList bikes={road.list} />
  );
};

export default RoadList;
