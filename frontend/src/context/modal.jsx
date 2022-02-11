import React, { forwardRef, useCallback, useState, createContext } from "react";
import { Box, Modal, Icon, IconButton } from "@mui/material";

const ModalContext = createContext();

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

export default ModalContext;

export function ModalContextProvider({ children }) {
  const [opened, setOpened] = useState(false);
  const [Component, setComponent] = useState(forwardRef(() => <div></div>));

  const openCustomModal = useCallback((C, props) => {
    setComponent(forwardRef(() => <C {...props} close={() => setOpened(false)} />));
    setOpened(true);
  }, [setOpened, setComponent]);

  return (
    <ModalContext.Provider value={openCustomModal}>
      {children}
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={opened}
        onClose={() => setOpened(false)}
      >
        <Box sx={style}>
          <Box sx={{ position: 'absolute', right: '0', top: '0' }}>
            <IconButton onClick={() => setOpened(false)}>
              <Icon color="error">close</Icon>
            </IconButton>
          </Box>
          <Box>
            <Component />
          </Box>
        </Box>

      </Modal>
    </ModalContext.Provider>
  );
}
