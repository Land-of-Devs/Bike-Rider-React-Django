import { useReducer, useState } from "react"
import { response } from "../services/tickets";


function reducer(state, action) {
  switch (action.type) {
    case 'message':
      state.message = action.payload;
      break;
    case 'subject':
      state.subject = action.payload;
      break;
    default:
      break;
  }

  return { ...state }; // Modify pointer state
}

export default (t) => {
  const [state, dispatch] = useReducer(reducer, {message: '', subject: '', email: t.ticket_head.client.email});
  const [hasError, setHasError] = useState(false);

  function sendMessage() {
    return new Promise((res, rej) => {
      response(state.email, state.subject, state.message)
      .then(res)
      .catch((e) => setHasError(e.response?.data?.errors || ['Unknown error']))
      .catch(rej);
    });
  }

  return {
    state,
    dispatch,
    sendMessage,
    hasError
  }
}

