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
import SummaryTable from "../Components/HomePage/SummaryTable";

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
  const [transactions, setTransactions] = React.useState<
    TransactionModelById[]
  >([]); // Specify AccountModel as the state type
  const [interestData, setInterestData] = React.useState<{
    [key: string]: MonthData;
  } | null>(null);

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await GetTransactions(); // Replace with your API call

      const count = await GetInterestTransactionsForAllAccounts();
      // console.log("cpunt", count.data)
      setInterestData(count.data);
      // Check if the response is an array before mapping over it
      console.log("response", response);
      if (Array.isArray(response)) {
        const formattedData: TransactionModelById[] = response.map(
          (item: any) => ({
            id: item.id,
            accountName: item.accountName,
            accountId: item.accountId,
            principalAmount: item.principalAmount,
            paidAmount: item.paidAmount,
            balanceAmount: item.balanceAmount,
            createdDate: item.createdDate,
            updatedDate: item.updatedDate,
            createdUserId: item.createdUserId,
            updatedUserId: item.updatedUserId,
            startDate: item.startDate,
            closeDate: item.closeDate,
            interestRate: item.interestRate,
          })
        );

        console.log("Formatted Data:", formattedData);
        setTransactions(formattedData);
      } else {
        console.error("API response is not an array:", response);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  console.log("Data from api", interestData);

  return (
    <>
      x
      <LayoutComponent>
        {/* <Box sx={{ flexGrow: 1, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CurrentMonth interestData={interestData} />
            </Grid>
            <Grid item xs={12}>
              <PreviousMonth  interestData={interestData}
              />
            </Grid>
            <Grid item xs={12}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box> */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Interest Calculations" {...a11yProps(0)} />
              <Tab label="Principal Calculations" {...a11yProps(1)} />
              {/* <Tab label="Identity Details" {...a11yProps(2)} />
          <Tab label="Passport Details" {...a11yProps(3)} />
          <Tab label="Identity Details" {...a11yProps(4)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SummaryTable />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {/* <EmployeeBankDetails /> */}
          </CustomTabPanel>
        </Box>
      </LayoutComponent>
    </>
  );
}

export default HomePage;
