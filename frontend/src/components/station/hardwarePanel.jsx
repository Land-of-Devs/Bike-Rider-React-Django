import { Box, Button, TextField, ButtonGroup } from "@mui/material";
import { useState } from "react";
import Form from '../global/form';

const HardwarePanel = ({ slots, fakeHardwareAwaitBikeOnSlot, unhook }) => {
  const [fakeHardwareBikeId, setFakeHardwareBikeId] = useState('');

  const handleFakeHardwareEvent = (slotNum) => {
    fakeHardwareAwaitBikeOnSlot(slotNum, +fakeHardwareBikeId);
  };


  return (
    <Form> {/* Fake Station controls */}
      <Box sx={{ backgroundColor: '#EEEEEE', p: 1, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Bike ID"
          name="bike_id"
          sx={{ flexBasis: 'fit-content' }}
          getter={fakeHardwareBikeId}
          rules={[]}
          setter={setFakeHardwareBikeId}
        />
        {
          slots.map((bike, i) => (
            <Box key={i}>
              <div>Slot {i + 1}</div>
              <ButtonGroup variant="contained" sx={{ m: 2 }}>
                <Button
                  disabled={!!bike}
                  onClick={() => handleFakeHardwareEvent(i + 1)}
                >
                  Hook
                </Button>
              </ButtonGroup>
            </Box>
          ))
        }

      </Box>
    </Form>
  )
}

export default HardwarePanel;
