import React, { useState, useEffect } from "react";
import useAuth from '/src/hooks/useAuth'
import { Box, Typography, Grid, Link, TextField, Button, CircularProgress, Alert, Checkbox, FormControlLabel } from '@mui/material'
import LoginForm from "./loginForm";
import ErrorList from "../errorList";
import useModal from "/src/hooks/useModal";
import useToast from "/src/hooks/useToast";
import { rules } from "/src/utils/validate";
import Form from "../form";
import PrivacyTerms from "../privacyterms";

const RegisterForm = ({ close }) => {
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState("");
  const openCustomModal = useModal();
  const addToast = useToast();
  const { isLoading, hasError, register } = useAuth();

  useEffect(() => { hasError && addToast({ msg: <ErrorList errors={hasError} />, type: 'error' }) }, [hasError])

  const handleSubmit = async (e) => {
    if (await register({ dni, email, password })) {
      addToast({ msg: 'You have successfuly registered!', type: 'success' })
      close();
    }
  };

  return (
    <Form>
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="DNI"
            name="dni"
            autoComplete="dni"
            autoFocus
            getter={dni}
            rules={[rules.required, rules.dni]}
            setter={setDni}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            getter={email}
            rules={[rules.required, rules.email]}
            setter={setEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            setter={setPassword}
            rules={[rules.required, rules.password]}
            getter={password}
          />

          <Checkbox
            checked={accepted}
            getter={accepted}
            setter={setAccepted}
            inputProps={{ 'aria-label': 'controlled' }}
            label={<span>Acepto la <span onClick={() => openCustomModal(PrivacyTerms, {onClose: () => openCustomModal(RegisterForm, {close})})} style={{textDecoration: 'underline'}}>política de privacidad</span></span>}
            required
          />

          <Button
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
          >
            {!isLoading ? 'Sign Up' : <CircularProgress />}
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
    </Form>
  );
}


export default RegisterForm;