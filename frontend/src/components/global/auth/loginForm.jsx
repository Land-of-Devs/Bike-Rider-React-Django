import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '/src/hooks/useAuth';
import { useEffect } from "react";
import { Box, Typography, Grid, Link, TextField, Button, CircularProgress } from '@mui/material';
import useModal from "/src/hooks/useModal"
import RegisterForm from "./registerForm";
import ErrorList from "../errorList";
import useToast from "/src/hooks/useToast";
import Form from "../form";
import { rules } from "../../../utils/validate";

const LoginForm = ({ close }) => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const openCustomModal = useModal();
  const navigate = useNavigate()
  const { isLoading, hasError, login, isLogged } = useAuth()
  const addToast = useToast();

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate])

  useEffect(() => { hasError && addToast({ msg: <ErrorList errors={hasError} />, type: 'error' })},[hasError])

  const handleSubmit = async (e) => {
    if (await login({ dni, password })) {
      addToast({ msg: 'Welcome to Bike Rider!', type: 'success' })
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
          Sign In
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
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            getter={password}
            setter={setPassword}
            rules={[rules.required]}
          />
          <Button
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
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
                openCustomModal(RegisterForm) && close()
              }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
}

export default LoginForm;