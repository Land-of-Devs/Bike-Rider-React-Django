import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress
} from "@mui/material";
import useToast from "/src/hooks/useToast";
import useSubscription from "/src/hooks/useSubscription";

const Subscription = ({ close }) => {
  const [newSubs, setNewSubs] = useState('')
  const addToast = useToast();
  const { changeSubscription, subscription, subscriptions, subscriptionList, isLoading } = useSubscription();

  const handleChange = (e) => {
    console.log(subscription, newSubs)
    setNewSubs(e.target.value);
  }

  const handleSubmit = () => {
    changeSubscription({sub: newSubs})
    addToast({ msg: 'You have change your subscription!', type: 'success' })
  }

  useEffect(async () => {
    await subscriptionList()
  }, [])

  return (
    <Box sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }} >
      <Typography variant="h4" textAlign="center">
        Subscription
      </Typography>
      <Box>
        {!subscription ?
        <Typography>
          You don't have a reservation!
        </Typography>
        :
        subscription.name
        }
      </Box>
      <Box sx={{ mt: "10px" }}>
        {!isLoading ?
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <InputLabel id="subscriptions">Subscriptions</InputLabel>
            <Select
              labelId="subscriptions"
              id="subscriptions"
              value={newSubs}
              onChange={handleChange}
              label="Subscriptions"
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