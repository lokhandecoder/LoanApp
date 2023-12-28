import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  FormHelperText,
} from "@mui/material";
import { AccountModel } from "../../Model/AccountModel";
import { TransactionByAccountID, TransactionModelById } from "../../Model/TransactionModel";
import { SelectChangeEvent } from "@mui/material/Select";
import { fetchTransactionByAccountID } from "../../Services/TransactionServices";
import { GetAccounts } from "../../Services/AccountServices";
import TransactionsByAccountIdTable from "./TransactionsByAccountIdTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function SearchAccounts() {
    const [accountList, setAccountList] = React.useState<AccountModel[]>();
    const [selectedAccountId, setSelectedAccountId] = React.useState<string>("");
    const [isError, setIsError] = React.useState<boolean>(false);
    const [generateList, setGenerateList] = React.useState<TransactionByAccountID[]>();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>();

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value as string;
      setSelectedAccountId(value); // Store the selected account ID
      setIsError(false); // Reset error when user selects a value
    };
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GetAccounts();
          if (Array.isArray(response)) {
            setAccountList(response);
          } else {
            console.error("Invalid response format:", response);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
    // const [person, setPerson] = useState
    const handleSearch = async () => {
      if (!selectedAccountId) {
        setIsError(true);
        return;
      }
  
      let formattedDate = ""; // Default formatted date value

      if (selectedDate) {
        const date = new Date(selectedDate);
        formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
        console.log("Formatted date before submit:", formattedDate);
      } else {
        // Handle the case when selectedDate is null or undefined
        // You may choose to set a default date or perform alternative logic here
      }
      const sendObject = {
        accountId: selectedAccountId,
        EmiMonth: formattedDate
      };
      console.log('Sending object:', sendObject);
      try {
        const response = await fetchTransactionByAccountID(sendObject);
        console.log("res: ", response.data);
        if (Array.isArray(response.data)) {
          const formattedData: TransactionByAccountID[] = response.data.map((item: any) => ({
            id: item.id,
            transactionId: item.transactionId,
            principalAmount: item.principalAmount,
            interestRate: item.interestRate,
            interestAmount: item.interestAmount,
            paidInterestAmount: item.paidInterestAmount,
            emiMonth: item.emiMonth,
            balanceInterestAmount: item.balanceInterestAmount
          }));
      
          console.log("New data from API", formattedData);
          setGenerateList(formattedData);
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        // Handle error during fetching transaction
      }
      
      
    };
  
    const handleReset = () => {
      setSelectedAccountId("");
      setIsError(false); // Reset error on reset button click
      setGenerateList([])
      setSelectedDate(null)
    };
    const handleDateChange = (newDate: Date | null) => {
        if (newDate !== null) {
          // Handle the newDate value
          setSelectedDate(newDate);
        }
      };


  return (
    <>
      <Card sx={{ minWidth: 275, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          
        </Typography>
        <CardContent>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <FormControl fullWidth error={isError}>
                <InputLabel id="demo-simple-select-label">
                  Account Name
                </InputLabel>
                <Select
                  labelId="accountID"
                  id="accountID"
                  name="accountID"
                  label="Account Name"
                  value={selectedAccountId || ""} // Ensure a valid value or fallback to an empty string
                  onChange={handleSelectChange}
                >
                  {accountList?.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.accountName}
                    </MenuItem>
                  ))}
                </Select>
                {isError && (
                  <FormHelperText>Please select an account</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DemoContainer components={["DatePicker"]}> */}
                  <DatePicker
                    label={'"month" and "year"'}
                    views={["month", "year"]}
                    onChange={handleDateChange}
                    value={selectedDate}
                  />
                {/* </DemoContainer> */}
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Searchl
          </Button>
          <Button onClick={handleReset} variant="contained" color="secondary">
            Reset
          </Button>
        </CardActions>
      </Card>
        {generateList && generateList.length > 0 && (
          <Paper>
            <TransactionsByAccountIdTable generateList={generateList}  />
          </Paper>
        )}

    </>
  )
}

export default SearchAccounts