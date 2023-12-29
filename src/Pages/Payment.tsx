import React from "react";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import SearchAccounts from "../Components/Payment/SearchAccounts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UpdateSearchAccounts from "../Components/Payment/UpdateSearchAccounts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Payment() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <LayoutComponent>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Pay INterest" {...a11yProps(0)} />
              <Tab label="Pay Principal " {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SearchAccounts />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UpdateSearchAccounts />
          </CustomTabPanel>
        </Box>
      </LayoutComponent>
    </>
  );
}

export default Payment;
