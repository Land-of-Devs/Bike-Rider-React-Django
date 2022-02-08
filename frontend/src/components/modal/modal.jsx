import { Box, Modal } from "@mui/material";
import { forwardRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import eventBus from "../../utils/eventBus";

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

const CustomModal = () => {

  const [opened, setOpened] = useState(false);
  const [Component, setComponent] = useState(forwardRef(() => <div></div>));

  // onMount
  useEffect(() => {
    eventBus.on('modal/open', (C) => {
      setComponent(forwardRef(() => <C close={() => setOpened(false)} />));
      setOpened(true);
    });
  }, []);

  // onDestroy
  useEffect(() => () => eventBus.remove('modal/open'), []);

  return (
    <Modal
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    open={opened}
    onClose={ () => setOpened(false) }
    >
      <Box sx={style}>
        <Component />
      </Box>
      
    </Modal>
  );

};


export default CustomModal;
