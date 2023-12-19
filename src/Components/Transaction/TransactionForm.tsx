import * as React from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { AccountUtilities } from "../../Utilities/AccountUtilities";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
} from "@mui/material";
import { TransactionModel } from "../../Model/TransactionModel";

function TransactionForm() {
  const today = dayjs();
  const todayDate = today.toDate();
  const { id } = useParams(); // Get the ID parameter from the URL
  const accountId = id ? id : ""; // Check if it's a new account or an existing one
  const [createTransaction, setCreateTransaction] =
    React.useState<TransactionModel>({
      accountID: "",
      mobileNo: "",
      emailAddress: "",
      isActive: false,
      principalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
      createdDate: todayDate,
      updatedDate: todayDate,
      createdUserId: "",
      updatedUserId: "",
      startDate: todayDate,
      closeDate: todayDate,
      interestRate: 0,
    });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = event.target;

  //   setCreateTransaction((prevTransaction) => ({
  //     ...prevTransaction,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
  
    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: type === "checkbox" ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };
  const handleDatePickerChange = (date: Date | null, name: string) => {
    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: date || todayDate,
    }));
  };
  const handleSave = () => {
    // Add logic to save the transaction data
    console.log("Saving transaction:", createTransaction);
  };

  const handleReset = () => {
    // Reset the form fields to their initial state
    setCreateTransaction({
      accountID: "",
      mobileNo: "",
      emailAddress: "",
      isActive: false,
      principalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
      createdDate: todayDate,
      updatedDate: todayDate,
      createdUserId: "",
      updatedUserId: "",
      startDate: todayDate,
      closeDate: todayDate,
      interestRate: 0,
      // ... (your existing initial state)
    });
  };
  return (
    <>
      <Card sx={{ minWidth: 275, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {accountId === "" ? "Create Transaction" : "Update Transaction"}
        </Typography>
        <CardContent>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Account ID"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="accountID"
                value={createTransaction.accountID}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Principal Amount"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="principalAmount"
                value={createTransaction.principalAmount}
                onChange={handleChange}
                // value={Account.accountName}
                // onChange={handleChange}
                // error={!!errors.accountName}
                // helperText={errors.accountName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your paid Amount"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="paidAmount"
                value={createTransaction.paidAmount}
                onChange={handleChange}
                // value={Account.accountName}
                // onChange={handleChange}
                // error={!!errors.accountName}
                // helperText={errors.accountName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your balance Amount"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="balanceAmount"
                value={createTransaction.balanceAmount}
                onChange={handleChange}
                // value={Account.accountName}
                // onChange={handleChange}
                // error={!!errors.accountName}
                // helperText={errors.accountName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter Created Date"
                  //   value={/* set the value here */}
                  //   onChange={/* handle change */}
                  //   renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter Updated Date"
                  //   value={/* set the value here */}
                  //   onChange={/* handle change */}
                  //   renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter Start Date"
                  //   value={/* set the value here */}
                  //   onChange={/* handle change */}
                  //   renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter Close Date"
                  //   value={/* set the value here */}
                  //   onChange={/* handle change */}
                  //   renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          <Button onClick={handleSave} variant="contained" color="primary">
            {accountId === "" ? "Create" : "Update"}
          </Button>
        </CardActions>
      </Card>
      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={snackbar.handleSnackbarClose}
        anchorOrigin={snackbar.position}
      >
        <Alert
          onClose={snackbar.handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default TransactionForm;
