import { Button, CircularProgress, Container, Grid, Paper, Typography, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Form from '../components/global/form';
import useStationAuth from "../hooks/useStationAuth";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import ErrorList from "../components/global/errorList";

const StationConfig = () => {
  const [token, setToken] = useState('');
  const { station, state, configure } = useStationAuth();
  const addToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (station) navigate('/station')
    if (state.error) {
      addToast({ msg: <ErrorList errors={state.error} />, type: 'error' });
    }
  }, [station, state.error])

  const handleSubmit = useCallback(async () => {
    if (await configure(token)) {
      addToast({ msg: 'Station successfully configured!', type: 'success' });
      navigate('/station');
    }
  }, [token]);

  return (
    <Container maxWidth={false} sx={{ p: 5, display: 'flex', flexGrow: 1, backgroundColor: '#F5F5F5' }}>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8} lg={6} >
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Configure station
            </Typography>
            <Form>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Config Token"
                name="token"
                autoFocus
                getter={token}
                rules={[]}
                setter={setToken}
              />
              <Button
                disabled={state.loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                {!state.loading ? 'Install station' : <CircularProgress />}
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StationConfig;
