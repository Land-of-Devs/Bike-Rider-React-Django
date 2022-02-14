import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel } from '../components/panel/tabpanel';
import { StationMap } from '../components/global/stationmap';

function accessibleProps(index) {
  return {
    'id': `panel-tab-${index}`,
    'aria-controls': `panel-tabpanel-${index}`,
  };
}

const Panel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{backgroundColor: '#F5F5F5', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered  value={value} onChange={handleChange} aria-label="panel tabs">
          <Tab label="Stations Map" {...accessibleProps(0)} />
          <Tab label="On-Road bike list" {...accessibleProps(1)} />
          <Tab label="Support Tickets" {...accessibleProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <StationMap type="maintenance" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}

export default Panel;
