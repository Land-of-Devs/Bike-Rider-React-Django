import { useEffect, useReducer, useState } from "react"
import { status } from "../services/bikes";

function reducer(state, action) {
  switch (action.type) {
    case 'status':
      state.status = action.payload;
      return { ...state};
      break;
    default:
      return state;
      break;
  }
}

export default (b) => {
  const [changed, setChanged] = useState(false);
  const [bike, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(b)));

  function saveStatus() {
    return new Promise((res, rej) => {
      status(bike.id, {status: bike.status})
      .then(() => b.status = bike.status).then(res)
      .catch(rej);
    });
  }

  function bikeChanged() {
    return JSON.stringify(b) != JSON.stringify(bike);
  }

  useEffect(() => {
    if (bikeChanged()) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [bike]);

  return {
    bike_s: bike,
    dispatch,
    changed,
    saveStatus
  }
}