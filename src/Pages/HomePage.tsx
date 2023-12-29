import SideNav from "../Components/Fixed/SideNav";
import Box from "@mui/material/Box";
import Navbar from "../Components/Fixed/Navbar";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PreviousMonth from "../Components/HomePage/PrevousMonth/PreviousMonth";
import {
  TransactionByAccountID,
  TransactionModelById,
} from "../Model/TransactionModel";
import {
  GetInterestTransactionsForAllAccounts,
  GetTransactions,
} from "../Services/TransactionServices";
import CurrentMonth from "../Components/HomePage/CurrentMonth/CurrentMonth";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PendingInterestEmiTable from "../Components/HomePage/PendingInterestEmiTable";
import InterestSummaryTable from "../Components/HomePage/InterestSummaryTable";
import PrincipalSummaryTable from "../Components/HomePage/PrincipalSummaryTable";
import PendingPrincipalAmountTable from "../Components/HomePage/PendingPrincipalAmountTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
interface Transaction {
  totalInterestAmount: number;
  balanceInterestAmount: number;
  paidInterestAmount: number;
  emiMonth: string;
}

export interface MonthData {
  month: string;
  transactions: Transaction[];
}
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
function HomePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      x
      <LayoutComponent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Interest Calculations" {...a11yProps(0)} />
              <Tab label="Principal Calculations" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InterestSummaryTable />
                </Grid>
                <Grid item xs={12}>
                  <PendingInterestEmiTable />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PrincipalSummaryTable />
                </Grid>
                <Grid item xs={12}>
                  <PendingPrincipalAmountTable />
                  {/* <PendingInterestEmiTable /> */}
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
        </Box>
      </LayoutComponent>
    </>
  );
}

export default HomePage;
