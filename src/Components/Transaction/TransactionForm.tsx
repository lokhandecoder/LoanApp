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
import { TransactionUtilities } from "../../Utilities/TransactionUtilities";

function TransactionForm() {
  const Transaction = TransactionUtilities();

  const {
    accountId,
    createTransaction,
    handleChange,
    handleDateChange,
    handleSave,
    errors,
  } = Transaction;

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
                error={!!errors.accountID}
                helperText={errors.accountID}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Principal Amount"
                variant="outlined"
                fullWidth
                type="number"
                autoComplete="off"
                name="principalAmount"
                value={createTransaction.principalAmount}
                onChange={handleChange}
                error={!!errors.principalAmount}
                helperText={errors.principalAmount}
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
                type="number"
                name="paidAmount"
                value={createTransaction.paidAmount}
                onChange={handleChange}
                error={!!errors.paidAmount}
                helperText={errors.paidAmount}
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
                type="number"
                value={createTransaction.balanceAmount}
                onChange={handleChange}
                error={!!errors.balanceAmount}
                helperText={errors.balanceAmount}
                // value={Account.accountName}
                // onChange={handleChange}
                // error={!!errors.accountName}
                // helperText={errors.accountName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Enter Start Date"
                    value={dayjs(createTransaction.startDate)}
                    onChange={(date: any) =>
                      handleDateChange(date, "startDate")
                    }
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Enter Close Date"
                    value={dayjs(createTransaction.closeDate)}
                    onChange={(date: any) =>
                      handleDateChange(date, "closeDate")
                    }
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Interest Rate"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="interestRate"
                type="number"
                value={createTransaction.interestRate}
                error={!!errors.interestRate}
                helperText={errors.interestRate}
                onChange={handleChange} // Use the existing handleChange function
              />
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