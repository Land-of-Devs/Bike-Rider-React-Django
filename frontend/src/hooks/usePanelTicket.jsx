import { useEffect, useReducer, useState } from "react"
import { status } from "../services/tickets";

function reducer(state, action) {
  switch (action.type) {
    case 'status':
      state.ticket_head.status = action.payload;
      return { ...state};
      break;
    default:
      return state;
      break;
  }
}

let savedTicket;

export default (t, loadSaved) => {
  const [changed, setChanged] = useState(false);
  const [ticket, dispatch] = useReducer(reducer, loadSaved ? savedTicket : JSON.parse(JSON.stringify(t)));

  function saveStatus() {
    status(ticket.ticket_head.id, {status: ticket.ticket_head.status});
    t.ticket_head.status = ticket.ticket_head.status; 
  }

  function ticketChanged() {
    return JSON.stringify({...t, bike_id: undefined}) != JSON.stringify({...ticket, bike_id: undefined}); // Remove bike from comparation and compare strings with json
  }

  useEffect(() => {
    if (ticketChanged()) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [ticket]);

  useEffect(() => () => { 
    savedTicket = ticket;
  }, []);

  return {
    ticket_s: ticket,
    dispatch,
    changed,
    saveStatus
  }
}