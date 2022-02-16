import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import ErrorList from "../errorList";
import useToast from "/src/hooks/useToast";
import useTravels from "/src/hooks/useTravels";
import useTickets from "/src/hooks/useTickets";

import Form from "../form";
import { rules } from "../../../utils/validate";
import * as formatter from "/src/utils/formatter";

const TicketForm = ({ close, stationID }) => {

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  //Maintenance
  const [object, setObject] = useState("");
  const [station, setStacion] = useState(stationID);
  const [bike, setBike] = useState("");
  const { travels, getTravels } = useTravels();
  const { sendTicket, isLoading, hasError } = useTickets();
  //Support
  const [subject, setSubject] = useState("");
  const addToast = useToast();

  useEffect(() => { hasError && addToast({ msg: <ErrorList errors={hasError} />, type: 'error' }) }, [hasError]);

  useEffect(() => {
    getTravels();
  }, [getTravels])

  const handleHeadType = (e) => {
    setType(e.target.value);
  }

  const handleObject = (e) => {
    setObject(e.target.value);
  }

  const handleSubject = (e) => {
    setSubject(e.target.value);
  }

  const handleBike = (e) => {
    console.log(e.target.value)
    setBike(e.target.value);
  }

  const handleSubmit = async () => {

    let head = { title, type };
    let ticket = {};

    if (type == 'MAINTENANCE') {

      if (object == 'BIKES') {
        ticket = { ticket: { ticket_head: head, type: object, bike, message } };
      } else {
        ticket = { ticket: { ticket_head: head, type: object, station, message } };
      }

    } else {
      ticket = { ticket: { ticket_head: head, type: subject, message } };
    }

    if (await sendTicket(ticket)) {
      addToast({ msg: 'Ticket sent successfuly!', type: 'success' })
      close();
    }
  };

  return (
    <>
      <Form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Ticket
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              getter={title}
              rules={[rules.required, rules.string]}
              setter={setTitle}
            />
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              fullWidth
              onChange={handleHeadType}
              label="Type"
            >
              {(travels.length > 0 || station) &&
                <MenuItem value="MAINTENANCE" name="Maintenance">
                  <em>Maintenance</em>
                </MenuItem>
              }
              <MenuItem value="SUPPORT" name="Support">
                <em>Support</em>
              </MenuItem>
            </Select>
            {
              (type == 'MAINTENANCE' &&
                <>
                  <InputLabel id="Object">Object</InputLabel>
                  <Select
                    labelId="object"
                    id="object"
                    value={object}
                    fullWidth
                    onChange={handleObject}
                    label="Object"
                  >
                    {travels.length > 0 &&
                      <MenuItem value="BIKES" name="Bikes">
                        <em>Bikes</em>
                      </MenuItem>
                    }
                    {station &&
                      <MenuItem value="STATION" name="Station">
                        <em>Stacion</em>
                      </MenuItem>
                    }
                  </Select>
                  {(object == 'BIKES' &&
                    <>
                      <InputLabel id="travels">Travels</InputLabel>
                      <Select
                        labelId="travels"
                        id="travels"
                        value={bike}
                        fullWidth
                        onChange={handleBike}
                        label="Travels"
                        MenuProps={{ PaperProps: { sx: { maxHeight: 150} } }}
                      >
                        {
                          travels.map(travel => (
                            <MenuItem key={travel.bike_id} value={travel.bike_id} name={formatter.date(travel.start)}>
                              <em>{formatter.date(travel.start)}</em>
                            </MenuItem>
                          ))
                        }

                      </Select>
                    </>
                  )}
                </>
              ) ||
              (type == 'SUPPORT' &&
                <>
                  <InputLabel id="Subject">Subject</InputLabel>
                  <Select
                    labelId="subject"
                    id="subject"
                    value={subject}
                    fullWidth
                    onChange={handleSubject}
                    label="Subject"
                  >
                    <MenuItem value="TRAVELS" name="Travels">
                      <em>Travels</em>
                    </MenuItem>
                    <MenuItem value="ACCOUNT" name="Account">
                      <em>Account</em>
                    </MenuItem>
                  </Select>
                </>
              )
            }
            <TextField
              margin="normal"
              required
              fullWidth
              label="Message"
              name="message"
              autoComplete="message"
              autoFocus
              getter={message}
              rules={[rules.required, rules.string]}
              setter={setMessage}
            />
            <Button
              disabled={
                isLoading ||
                (
                  !type ||
                  (type == 'SUPPORT' && !subject) ||
                  (type == 'MAINTENANCE' &&
                    (
                      !object || (object == 'BIKES' && !bike)
                    )
                  )
                )
              }
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              {!isLoading ? 'Send' : <CircularProgress />}
            </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
}

export default TicketForm;