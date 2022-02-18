import { Button, MenuItem, Select, Table, TableBody, TableCell, TableRow } from "@mui/material";
import useBike from "../../../hooks/useBike";

const BikeView = ({bike, close}) => {
  const { bike_s, changed, dispatch, saveStatus } = useBike(bike);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>ID: </b></TableCell>
            <TableCell>{bike_s.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Last check: </b></TableCell>
            <TableCell>{bike_s.last_check}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Station: </b></TableCell>
            <TableCell>{bike_s.station?.id || bike_s.station || 'No station'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Status: </b></TableCell>
            <TableCell>
              <Select value={bike_s.status} onChange={(event) => dispatch({type: 'status', payload: event.target.value})}>
                <MenuItem value={"OK"}>Ok</MenuItem>
                <MenuItem value={"REPAIRING"}>Repairing</MenuItem>
                <MenuItem value={"UNAVAILABLE"}>Unavaliable</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button disabled={!changed} onClick={() => saveStatus().then(() => close())} variant="contained" sx={{alignSelf: 'center', marginTop: '30px'}}>Save</Button>
    </div>

  );
};

export default BikeView;
