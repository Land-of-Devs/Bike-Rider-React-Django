import { Grid, Paper, Typography, Button } from "@mui/material";
import useBooking from "../../hooks/useBooking";
import Counter from "../global/counter";

const MainScreen = ({ slots, unhook }) => {
  const { reservation } = useBooking();

  const StopReservation = (bool) => {

  }

  return (
    <>
      <Grid item xs={12} md={10} lg={8} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {
          slots.map((bike, i) => (
            <Paper key={i}
              sx={
                {
                  p: 2,
                  m: 1,
                  bgcolor:
                    !bike ? "#727872" :
                      bike.booking ? "#f4c73e" :
                        bike.status == 'REPAIRING' ? "#44a0f4" :
                          bike.status == 'UNAVAILABLE' ? "#e04242" :
                            "#30c230",
                  color: "white.main",
                  borderRadius: "20px",
                  width: "225px",
                  height: "175px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center"
                }
              }>
              <Typography variant="h5" fontWeight="900" textAlign="center">SLOT {i + 1}</Typography>
              {bike && !isFinite(bike) ? (
                <>
                  {
                    (bike.booking &&
                      <>
                        <Counter height={"40px"} width={"120px"} text={"25px"} date={bike.booking.time_end} />
                      </>
                    )
                  }
                  {
                    bike.status == 'OK' &&
                    (
                      (
                        (bike.booking && Object.keys(reservation).length > 0 ) &&
                        (reservation.id == bike.booking.id)
                      ) ||
                      (
                        Object.keys(reservation).length == 0 &&
                        !bike.booking
                      )
                    ) && (
                      <Button
                        variant="contained"
                        sx={{bgcolor: "primary.dark", borderRadius: "10px"}}
                        disabled={!bike}
                        onClick={() => unhook(bike.id)}
                      >
                        Unhook
                      </Button>
                    )
                  }
                  {
                    bike.booking && (
                      <Typography variant="body1" fontWeight="900" textAlign="center">BOOKED BIKE</Typography>
                    ) ||
                    bike.status != 'OK' && (
                      <Typography variant="body1" fontWeight="900" textAlign="center">{bike.status} BIKE</Typography>
                    ) || !bike.booking && (
                      <Typography variant="body1" fontWeight="900" textAlign="center">AVALIABLE BIKE</Typography>
                    )
                  }

                </>

              ) : (
                  <Typography variant="body1" fontWeight="900" textAlign="center">AVALIABLE SLOT</Typography>
              )}
            </Paper>
          ))
        }
      </Grid>
    </>
  )
};

export default MainScreen;
