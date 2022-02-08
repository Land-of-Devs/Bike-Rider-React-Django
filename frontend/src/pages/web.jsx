import { useEffect, useState } from 'react';

const Web = () => {
  var [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setLoaded(true);
  }, []);

  return (<div>{loaded ? 'Web' : 'Loading 2'}</div>)
};

export default Web;