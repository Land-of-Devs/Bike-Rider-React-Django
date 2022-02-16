import { Box, Typography, Button } from "@mui/material";

import useToast from "/src/hooks/useToast";
import useBooking from "../../../hooks/useBooking";
import Counter from "../../global/counter";

const Reservation = ({ close }) => {

  const addToast = useToast();
  const { reservation, setReservation, cancelReservation} = useBooking();

  const handleReservation = (bool) => {
    bool && setReservation({})
  }

  const handleCancel = () => {
    cancelReservation();
    addToast({ msg: 'You have cancelled the resevation!', type: 'success' })
  }

  return (
    <>
      {Object.keys(reservation).length > 0 ?
        <Box sx={{ maxWidth: 345, display: "flex", flexDirection: "column"}} >
          <Typography variant="h4" textAlign="center">
           Reservation
          </Typography>
          <Counter height={"100px"} width={"100%"} text={"40px"} date={reservation.time_end} timeUp={handleReservation} />
          <Box sx={{mt: "10px"}}>
            <Typography variant="h6">
                Station:
            </Typography>
            <Typography size="10px" gutterBottom color="text.secondary">
              Your reservation is at {reservation.station.name} station.
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 1, borderRadius: "20px"}}
              onClick={() => handleCancel()}
              color="error"
              size="large"
            >
              Cancel
            </Button>
          </Box>
        </Box >
        :
        <Typography>
          You don't have a reservation!
        </Typography>
      }
    </>
  );
};


export default Reservation;
