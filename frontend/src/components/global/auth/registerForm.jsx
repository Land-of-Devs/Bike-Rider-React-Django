import React, { useState, useEffect } from "react";
import useAuth from '/src/hooks/useAuth'
import { Box, Typography, Grid, Link, TextField, Button, CircularProgress, Alert } from '@mui/material'
import LoginForm from "./loginForm";
import ErrorList from "../errorList";
import useModal from "/src/hooks/useModal";
import useToast from "/src/hooks/useToast";

const RegisterForm = ({ close }) => {
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openCustomModal = useModal();
  const addToast = useToast();
  const { isLoading, hasError, register } = useAuth()
  
  useEffect(() => { hasError && addToast({ msg: <ErrorList errors={hasError} />, type: 'error' }) }, [hasError])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await register({ dni, email, password })) { 
      addToast({ msg: 'You have successfuly registered!', type: 'success' })
      close(); 
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="dni"
            label="DNI"
            name="dni"
            autoComplete="dni"
            autoFocus
            onChange={(e) => setDni(e.target.value)}
            value={dni}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {!isLoading ? 'Sign In' : <CircularProgress />}
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                openCustomModal(LoginForm) && close()
              }}>
              {"Do you have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}


export default RegisterForm;