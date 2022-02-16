import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

function Counter({ date = null, timeUp, width, height, text }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [loading, setLoading] = useState(true);

  if (!date) return null


  useEffect(() => {
    const endDate = new Date(date).getTime();
    const timer = () => {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      const remainingTime = endDate - now.getTime();
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const minutesLeft = Math.trunc((remainingTime % hour) / minute);
      const secondsLeft = Math.trunc((remainingTime % minute) / second);

      setMinutes(minutesLeft);
      setSeconds(secondsLeft);

      if (remainingTime <= 0) {
        setLoading(false);
        setMinutes(0);
        setSeconds(0);
        if (timeUp) {
          timeUp(true);
        }
        clearInterval(interval);
      } else {
        setLoading(false)
      }
    }
    const interval = window.setInterval(timer, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [date])

  return (
    <>
      <Box
        height={height}
        width={width}
        sx={
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "secondary.main",
            borderRadius: "20px",
            color: "white.main",
            border: "1px solid #00000052",
            mb: "10px",
            mt: "10px"
          }
        }
      >
        {!loading
          ? < Typography fontSize={text} color="white" component="div">
            {(minutes + ':' + ((seconds >= 10) ? seconds : '0' + seconds))}
          </Typography>
          : <CircularProgress color="white" />
        }
      </Box>
    </>
  )
}

export default Counter
