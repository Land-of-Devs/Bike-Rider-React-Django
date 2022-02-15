import { Grid, Paper} from "@mui/material";
import Counter from "../global/counter";

const MainScreen = ({slots}) => {

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

export default MainScreen;