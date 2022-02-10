import { Box, Modal, Icon, IconButton } from "@mui/material";
import { forwardRef } from "react";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


export var openCustomModal;

export const CustomModal = () => {
  const [opened, setOpened] = useState(false);
  const [Component, setComponent] = useState(forwardRef(() => <div></div>));

  openCustomModal = (C, props) => {
    setComponent(forwardRef(() => <C {...props} close={() => setOpened(false)} />));
    setOpened(true);
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={opened}
      onClose={() => setOpened(false)}
    >
      <Box sx={style}>
        <Box sx={{mb: 2, display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
          <IconButton onClick={() => setOpened(false)}>
            <Icon color="error">close</Icon>
          </IconButton>
        </Box>
        <Box>
          <Component />
        </Box>
      </Box>

    </Modal>
  );

};
