import { useState } from 'react';
import { listOnRoad } from '../services/bikes';

export default function useRoad() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBikes = () => {
    if (list.length > 0) return;
    setLoading(true);
    listOnRoad().then(({results}) => {
      setList(results);
    }).catch(() => {
      
    }).finally(() => {
      setLoading(false);
    })
  };

  return {
    getBikes,
    list,
    loading
  }
}
