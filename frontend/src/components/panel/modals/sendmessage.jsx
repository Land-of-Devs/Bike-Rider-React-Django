import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import useResponseTicket from "../../../hooks/useResponseTicket";
import { rules } from "../../../utils/validate";
import ErrorList from "../../global/errorList";
import Form from '../../global/form';
import useToast from "/src/hooks/useToast";

const SendMessage = ({ ticket, close }) => {
  const { state, dispatch, sendMessage, hasError } = useResponseTicket(ticket);
  const addToast = useToast();

  useEffect(() => { hasError && addToast({ msg: <ErrorList errors={hasError} />, type: 'error' }) }, [hasError])

  return (
    <>
      <div style={{ margin: '5px' }}>Email: {state.email}</div>
      <div>
        <Form>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
              sx={{ width: 400, mb: 2, mt: 2 }}
              variant="outlined"
              label="Subject"
              getter={state.subject}
              setter={(value) => dispatch({ type: 'subject', payload: value})}
              rules={[rules.minLength(5), rules.maxLength(20), rules.string]}
            >
            </TextField>
            <TextField
              sx={{ width: 400 }}
              label="Message"
              multiline
              rows={10}
              variant="outlined"
              getter={state.message}
              setter={(value) => dispatch({ type: 'message', payload: value })}
              rules={[rules.minLength(25), rules.maxLength(200), rules.string]}
            />
            <Button variant="contained" sx={{ m: 2, alignSelf: 'center' }} onSubmit={() => sendMessage().then(() => addToast({msg: 'Message sent correctly!', type: 'success'})).then(close)}>Send</Button>
          </div>
        </Form>
      </div>

    </>)
}

export default SendMessage;
