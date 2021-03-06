import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  Divider
} from "@mui/material";
import useToast from "/src/hooks/useToast";
import useSubscription from "/src/hooks/useSubscription";

const Subscription = ({ close }) => {
  const [newSubs, setNewSubs] = useState('')
  const addToast = useToast();
  const { changeSubscription, subscription, subscriptions, subscriptionList, isLoading } = useSubscription();

  const handleChange = (e) => {
    setNewSubs(e.target.value);
  }

  const handleSubmit = () => {
    changeSubscription({ sub: newSubs })
    addToast({ msg: 'You have change your subscription!', type: 'success' })
  }

  useEffect(async () => {
    await subscriptionList()
  }, [])

  return (
    <Box sx={{ width: 300, display: "flex", flexDirection: "column" }} >
      <Typography variant="h4" textAlign="center">
        Subscription
      </Typography>
      <Box mt="20px" mb="10px">
        <Typography variant="h6" mb="20px">
          Actual:
        </Typography>
        {subscription == 'None' ?
          <Typography>
            You don't have any subscription!
          </Typography>
          :
          <>
          <Typography>
            <strong>Name: </strong>
            {subscription.name}
          </Typography>
          <Typography>
            <strong>Free Minutes: </strong>
            {subscription.min_minutes}
          </Typography>
            <Typography>
              <strong>Cent per Minutes: </strong>
              {subscription.cent_minute}¢
            </Typography>
          </>
        }
      </Box>
      <Divider  mt="10px" mb="10px" color="primary" />
      <Box sx={{ mt: "10px" }}>
        <Typography variant="h6" mb="20px">
          New:
        </Typography>
        {!isLoading ?
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <InputLabel id="subscriptions">Subscriptions</InputLabel>
            <Select
              labelId="subscriptions"
              id="subscriptions"
              value={newSubs}
              onChange={handleChange}
              label="Subscriptions"
              MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
            >
              {subscriptions.map(sub => (
                <MenuItem key={sub.id} value={sub.id} name={sub.name}>
                  <em>{sub.name}</em>
                </MenuItem>
              ))}

            </Select>
          </FormControl>
          :
          <CircularProgress />
        }
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={newSubs == subscription.id || newSubs == ''}
          variant="contained"
          sx={{ mt: 3, mb: 1, borderRadius: "20px" }}
          onClick={handleSubmit}
          color="error"
          size="large"
        >
          Change
        </Button>
      </Box>
    </Box >
  );
};


export default Subscription;