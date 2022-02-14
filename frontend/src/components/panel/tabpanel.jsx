import { Box, Typography } from "@mui/material";

export const TabPanel = ({ children, value, index, style = {}, ...other }) => {
  const hidden = value !== index;
  style.display = hidden ? 'none' : 'flex';
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`panel-tabpanel-${index}`}
      aria-labelledby={`panel-tab-${index}`}
      style={{flexGrow: 1, ...style}}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
};
