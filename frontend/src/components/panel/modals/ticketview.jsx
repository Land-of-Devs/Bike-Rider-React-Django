import { Button, MenuItem, Select, TableBody, TableCell, TableRow } from '@mui/material';
import Table from '@mui/material/Table';
import useModal from '/src/hooks/useModal';
import ClientView from './clientview';
import BikeView from './bikeview';
import usePanelTicket from '../../../hooks/usePanelTicket';

const TicketView = ({ ticket, onClose, usePreviousState, close }) => {
  const openCustomModal = useModal();
  const { dispatch, saveStatus, changed, ticket_s } = usePanelTicket(ticket, usePreviousState);

  function handleClick(c, props) {
    openCustomModal(
      c,
      {
        onClose: () => openCustomModal(TicketView, { onClose, ticket, usePreviousState: true }),
        ...props
      }
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>Title: </b></TableCell>
            <TableCell>{ticket_s.ticket_head.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Client: </b></TableCell>
            <TableCell><Button onClick={() => handleClick(ClientView, { client: ticket_s.ticket_head.client })}>Client</Button></TableCell>
          </TableRow>
          {ticket_s.bike_id && (
            <TableRow>
              <TableCell><b>Bike: </b></TableCell>
              <TableCell><Button onClick={() => handleClick(BikeView, { bike: ticket_s.bike_id })}>Bike</Button></TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell><b>Status: </b></TableCell>
            <TableCell>
              <Select value={ticket_s.ticket_head.status} onChange={(event) => dispatch({ type: 'status', payload: event.target.value })}>
                <MenuItem value={"PENDING"}>Pending</MenuItem>
                <MenuItem value={"RESOLVED"}>Resolved</MenuItem>
                <MenuItem value={"CANCELED"}>Canceled</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br></br>
      <div><b>Message</b></div>
      <div>{ticket_s.message}</div>
      <Button onClick={() => { saveStatus(); close() }} disabled={!changed} variant="contained" sx={{ alignSelf: 'center', marginTop: '30px' }}>Save</Button>
    </div>
  );
};

export default TicketView;
