import { Box, Container, Grid, Paper} from "@mui/material";
import LoginForm from "../components/global/auth/loginForm";
import useStationAuth from "../hooks/useStationAuth";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import MainScreen from "../components/station/mainScreen";
import StationHeader from "../components/station/header";
import {useState, useEffect} from "react";
import HardwarePanel from "../components/station/hardwarePanel";


/** This function would implement the hardware slot bike reading */
const Station = () => {
  const { station, slots, fakeHardwareAwaitBikeOnSlot, unhook } = useStationAuth();
  const { isLogged } = useAuth();
  const addToast = useToast();

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <StationHeader station={station}/>
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
              <MainScreen slots={slots} unhook={unhook} />
            )}
          </Grid>
        </Container>
      </Box>

      <HardwarePanel slots={slots} fakeHardwareAwaitBikeOnSlot={fakeHardwareAwaitBikeOnSlot} />
    </Box>
  )
}

export default Station;
