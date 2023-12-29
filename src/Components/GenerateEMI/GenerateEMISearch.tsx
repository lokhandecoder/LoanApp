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
  FormHelperText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AccountModel } from "../../Model/AccountModel";
import { GetAccounts } from "../../Services/AccountServices";
import {
  GenerateEMIbyTrnsactionID,
  GenerateEMIforAll,
  fetchTransactionByAccountID,
} from "../../Services/TransactionServices";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface GenerateEMISearchProps {
  selectedAccountId: string;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  accountList: AccountModel[];
  isError: boolean;
  handleSearch: () => void;
  handleReset: () => void;
  handleDateChange: (newDate: Date | null) => void; // Updated function signature
  selectedDate: Date | null;
  showGenerateButton: boolean;
  handleGenerateAll: () => void;
}

function GenerateEMISearch(props: GenerateEMISearchProps) {
  const {
    selectedAccountId,
    handleSelectChange,
    accountList,
    isError,
    handleSearch,
    handleReset,
    handleDateChange,
    selectedDate,
    showGenerateButton,
    handleGenerateAll,
  } = props;

  // const showGenerateButton = selectedAccountId === "1";

  // async function handleGenerateAll (){
  //   if(showGenerateButton && selectedDate){
  //     try{
  //       const date = new Date(selectedDate);
  //       const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
  //       console.log("Formatted date befor submit:", formattedDate);

  //       const sendObject = {
  //         TransactionId: selectedAccountId,
  //         EmiMonth: formattedDate
  //       };
  //       // rest of your code handling date
  //       const generate = await GenerateEMIforAll(sendObject);

  //       console.log("what is this", generate)
  //     }catch(e : any){

  //       console.error(e)
  //     }
  //   }
  // }
  return (
    <>
      <Card sx={{ minWidth: 275, mt: 3 }}>
        <Typography variant="subtitle1">Generate EMI</Typography>
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
                  <MenuItem value="1">All</MenuItem>
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
          {showGenerateButton && ( // Conditionally render the button
            <Button
              onClick={handleGenerateAll}
              variant="contained"
              color="warning"
            >
              Generate for ALL
            </Button>
          )}
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
          <Button onClick={handleReset} variant="contained" color="secondary">
            Reset
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default GenerateEMISearch;
