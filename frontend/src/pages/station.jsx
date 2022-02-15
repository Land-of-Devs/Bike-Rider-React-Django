import { Box, Button, Container, Grid, Paper, Typography, TextField, ButtonGroup } from "@mui/material";
import LoginForm from "../components/global/auth/loginForm";
import useStationAuth from "../hooks/useStationAuth";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import Counter from "../components/global/counter";
import { useEffect, useState } from "react";
import Form from '../components/global/form';

/** This function would implement the hardware slot bike reading */
function getSlotInfo(station) {
  return Array.from({ length: station.nslots }, (e, i) => (
    station.bikes[i] ? { ...station.bikes[i], booking: station.bookings[i] } : null
  ));
}

const StationMainScreen = () => {
  const { station } = useStationAuth();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    setSlots(getSlotInfo(station));
  }, [setSlots, station]);

  return (
    <>
      <Grid item xs={12} md={10} lg={8} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {
          slots.map((bike, i) => (
            <Paper key={i} sx={{ p: 2, m: 1 }}>
              <div>Slot {i + 1}</div>
              {bike ? (
                <>
                  <div>Bike {bike.id}</div>
                  <div>Status {bike.status}</div>
                  {bike.booking ? (
                    <Counter date={bike.booking.time_end} />
                  ) : (
                    <div>Not booked</div>
                  )}
                </>
              ) : (
                <div>Empty</div>
              )}
            </Paper>
          ))
        }
      </Grid>
    </>
  )
};

const Station = () => {
  const { station } = useStationAuth();
  const { isLogged, logout } = useAuth();
  const addToast = useToast();

  const [fakeHardwareBikeId, setFakeHardwareBikeId] = useState('');
  const [state, setState] = useState({ loading: false, error: false });

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    setSlots(getSlotInfo(station));
  }, [setSlots, station]);

  const notifyIssue = () => {
    /** TODO open ticket modal */
  };

  const handleFakeHardwareEvent = (action) => {
    console.log(action, fakeHardwareBikeId)
    /** TODO */
    switch (action) {
      case 'hook':
        break;

      case 'unhook':
        break;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h2" variant="h6">
          Welcome to station {station.name}
        </Typography>
        <Box>
        {isLogged && (
          <Button variant="outlined" color="error" onClick={notifyIssue}>Notify Issue</Button>
        )}
        {isLogged && (
          <Button variant="outlined" color="info" sx={{ml: 1}} onClick={logout}>Log Out</Button>
        )}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container maxWidth={false} >
          <Grid container spacing={6} justifyContent="center" alignItems="center">
            {!isLogged ? (
              <Grid item xs={12} md={8} lg={6} >
                <Paper sx={{ p: 2 }}>
                  <LoginForm stationLogin={true} />
                </Paper>
              </Grid>
            ) : (
              <StationMainScreen />
            )}
          </Grid>
        </Container>
      </Box>

      <Form> {/* Fake Station controls */}
        <Box sx={{ backgroundColor: '#EEEEEE', p: 1, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Bike ID"
            name="bike_id"
            sx={{flexBasis: 'fit-content'}}
            getter={fakeHardwareBikeId}
            rules={[]}
            setter={setFakeHardwareBikeId}
          />
          {
            slots.map((bike, i) => (
              <Box key={i}>
                <div>Slot {i + 1}</div>
                <ButtonGroup variant="contained" sx={{m: 2}}>
                  <Button
                    disabled={!!bike}
                    onClick={() => handleFakeHardwareEvent('hook')}
                  >
                    Hook
                  </Button>
                  <Button
                    disabled={!bike}
                    onClick={() => handleFakeHardwareEvent('unhook')}
                  >
                    Unhook
                  </Button>
                </ButtonGroup>
              </Box>
            ))
          }

        </Box>
      </Form>
    </Box>
  )
}

export default Station;
