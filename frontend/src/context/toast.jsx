import React, { useCallback, useState, createContext } from "react";
import { Snackbar, Alert, AlertTitle } from '@mui/material';
const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toast, setToast] = useState({msg: null, type: "warning"});
  const [open, setOpen] = useState(false);

  const callToast = useCallback(
    function (toast) {
      setToast(toast);
      setOpen(true);
    },
    [setToast]
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={callToast}>
      {children}

      <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal:'right'}} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={toast.type} onClose={handleClose} sx={{ width: '100%' }}>
            <AlertTitle>{toast.type.toUpperCase()}:</AlertTitle>
            {toast.msg}
          </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
