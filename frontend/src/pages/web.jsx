import { useEffect, useState } from 'react';
import CustomModal from '../components/modal/modal';
import TestModal from '../components/modal/test';
import eventBus from '../utils/eventBus';

const Web = () => {
  var [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    eventBus.dispatch('modal/open', TestModal);
    setLoaded(true);
  }, []);

  return (<div>{loaded ? 'Web' : 'Loading 2'}<CustomModal /></div>)
};

export default Web;