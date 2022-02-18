import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel } from '../components/panel/tabpanel';
import { StationMap } from '../components/global/stationmap';
import RoadList from "../components/panel/roadlist";
import useAuth from "../hooks/useAuth";
import { useCallback } from "react";
import SupportList from "../components/global/supportlist";

function accessibleProps(index) {
  return {
    'id': `panel-tab-${index}`,
    'aria-controls': `panel-tabpanel-${index}`,
  };
}

const Panel = () => {
  const { isMaintenance, isSupport } = useAuth();
  const [value, setValue] = useState(0);
  let i = 0;
  let j = 0;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="panel tabs">
          {isMaintenance && (
            [
              <Tab key="0" label="Stations Map" {...accessibleProps(i++)} />,
              <Tab key="1" label="On-Road bike list" {...accessibleProps(i++)} />
            ]
          )}
          {isSupport && <Tab label="Support Tickets" {...accessibleProps(i++)} />}
        </Tabs>
      </Box>
      {isMaintenance && (
        <>
          <TabPanel value={value} index={j++}>
            <StationMap type="maintenance" />
          </TabPanel>
          <TabPanel value={value} index={j++}>
            <RoadList></RoadList>
          </TabPanel>
        </>)}
      { isSupport && <TabPanel value={value} index={j++}>
        <SupportList></SupportList>
      </TabPanel> }
    </Box>
  )
}

export default Panel;
