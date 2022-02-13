import { CircularProgress } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { StationMap } from '../components/web/stationmap';
import { useStations } from '../hooks/useStations';

const Web = () => {
  return (
    <>
      <StationMap />
    </>)
};

export default Web;
