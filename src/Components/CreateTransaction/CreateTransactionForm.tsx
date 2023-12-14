import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import FormControl from "@mui/material/FormControl";

import {  LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { CreateTransactionModel } from "../../Model/createTransaction";
import dayjs, { Dayjs } from "dayjs";

const label = { inputProps: { "aria-label": "is Active" } };
const today = dayjs();
const todayDate = today.toDate();
function CreateTransactionForm() {
  const [createTransaction, setCreateTransaction] = React.useState<CreateTransactionModel>({
    accountName: "",
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (field: string, date: Date | null) => {
    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: date,
    }));
  };
  const handleSave = () => {
    // Add logic to save the transaction data
    console.log("Saving transaction:", createTransaction);
  };

  const handleReset = () => {
    // Reset the form fields to their initial state
    setCreateTransaction({
      accountName: "",
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter Full Name"
                variant="outlined"
                fullWidth
                name="accountName"
                value={createTransaction.accountName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter Mobile Number"
                variant="outlined"
                fullWidth
                name="mobileNo"
                value={createTransaction.mobileNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter Email Address"
                variant="outlined"
                fullWidth
                name="emailAddress"
                value={createTransaction.emailAddress}
                onChange={handleChange}
              />
            </Grid>
     

            <Grid item xs={12} sm={4} md={3} lg={3}>
              {/* Add a text field for principalAmount */}
              <TextField
                label="Principal Amount"
                variant="outlined"
                fullWidth
                name="principalAmount"
                type="number"
                value={createTransaction.principalAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {/* Add a text field for principalAmount */}
              <TextField
                label="Paid Amount"
                variant="outlined"
                fullWidth
                name="paidAmount"
                type="number"
                value={createTransaction.paidAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {/* Add a text field for principalAmount */}
              <TextField
                label="Balance Amount"
                variant="outlined"
                fullWidth   
                name="balanceAmount"
                type="number"
                value={createTransaction.balanceAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {/* Add a text field for principalAmount */}
              <TextField
                label="Interest Rate"
                variant="outlined"
                fullWidth   
                name="interestRate"
                type="number"
                value={createTransaction.interestRate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3} container alignItems="center">
              <Checkbox
                {...label}
                color="success"
                checked={createTransaction.isActive}
                onChange={(e) =>
                  setCreateTransaction((prevTransaction) => ({
                    ...prevTransaction,
                    isActive: e.target.checked,
                  }))
                }
                name="isActive"
              />
              <Typography variant="body1">is Active</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {/* Add actions as needed */}
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CreateTransactionForm;
