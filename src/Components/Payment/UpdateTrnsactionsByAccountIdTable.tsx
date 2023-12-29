import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  TransactionByAccountID,
  TransactionModelById,
} from "../../Model/TransactionModel";
import { IndeterminateCheckBoxSharp } from "@mui/icons-material";
import {
  PayInterestAmount,
  PayPrincipalAmount,
  fetchInterestByTransactionId,
} from "../../Services/PaymentServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useCustomSnackbar from "../Fixed/useCustomSnackbar";
import { stringify } from "querystring";
interface TransactionsByAccountIdTableProps {
  generateList: TransactionByAccountID[];
  handleSearch: () => void;
}
interface PaymentState {
  TransactionId: string | null;
  PaidInterestAmount: number | null;
}
interface PaymentResponse {
  status?: number; // Making the 'status' property optional
  // Other properties if present in the response
  // ...
}

function UpdateTrnsactionsByAccountIdTable(
  props: TransactionsByAccountIdTableProps
) {
  const { generateList, handleSearch } = props;
  const [selectedRow, setSelectedRow] = React.useState<string>("");
  const [paymentAmounts, setPaymentAmounts] = React.useState<{
    [key: string]: number;
  }>({});
  const [paymentAmountErrors, setPaymentAmountErrors] = React.useState<{
    [key: string]: string;
  }>({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [updatedList, setUpdatedList] = React.useState<
    TransactionByAccountID[]
  >([]);
  const snackbar = useCustomSnackbar();

  async function hanldePay(id: string) {
    const paymentAmount = paymentAmounts[id] || 0; // Get payment amount from state or default to 0
    const account = generateList.find((item) => item.id === id);

    if (!account) {
      // Handle case when account with the provided ID is not found
      return;
    }

    if (paymentAmount > account.balanceAmount) {
      // Display a message or perform an action indicating that payment amount exceeds balance
      setPaymentAmountErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "Payment amount exceeds balance",
      }));
      return;
    }
    setPaymentAmountErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

    const SendData = {
      Id: id,
      PaidAmount: paymentAmount,
    };

    try {
      const FetchInterest = await PayPrincipalAmount(SendData);
      // Resetting payment amount to 0 after successful payment
      setPaymentAmounts((prevAmounts) => ({
        ...prevAmounts,
        [id]: 0,
      }));
      handleSearch();
    } catch (error) {
      // Handle error scenarios here
    }
  }

  const handleAmountChange = (id: string, amount: number) => {
    setPaymentAmountErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
    setPaymentAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: amount,
    }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>principalAmount </TableCell>
              <TableCell>balanceAmount</TableCell>
              <TableCell>paidAmount</TableCell>
              <TableCell>interestRate </TableCell>
              <TableCell>Pay Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateList?.map((account, index) => (
              <TableRow key={index}>
                <TableCell>{account.principalAmount}</TableCell>
                <TableCell>{account.balanceAmount}</TableCell>
                <TableCell>{account.paidAmount}</TableCell>
                <TableCell>{account.interestRate}</TableCell>
                {account.balanceAmount === 0 ? (
                  <>
                    <TableCell colSpan={2}>Paid</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <TextField
                        label="Enter your Amount"
                        variant="outlined"
                        autoComplete="off"
                        name="payingAmount"
                        onChange={(e) =>
                          handleAmountChange(account.id, Number(e.target.value))
                        }
                        error={Boolean(paymentAmountErrors[account.id])}
                        helperText={paymentAmountErrors[account.id]}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => hanldePay(account.id)}
                        variant="contained"
                        color="success"
                      >
                        Pay
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
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
      </Snackbar>
    </>
  );
}

export default UpdateTrnsactionsByAccountIdTable;
