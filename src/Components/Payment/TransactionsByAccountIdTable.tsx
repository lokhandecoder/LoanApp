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
  fetchInterestByTransactionId,
} from "../../Services/PaymentServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useCustomSnackbar from "../Fixed/useCustomSnackbar";
import { stringify } from "querystring";
interface TransactionsByAccountIdTableProps {
  generateList: TransactionByAccountID[];
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

function TransactionsByAccountIdTable(
  props: TransactionsByAccountIdTableProps
) {
  const { generateList } = props;
  const [selectedRow, setSelectedRow] = React.useState<string>("");
  const [paymentAmounts, setPaymentAmounts] = React.useState<{
    [key: string]: number;
  }>({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [updatedList, setUpdatedList] = React.useState<
    TransactionByAccountID[]
  >([]);
  const snackbar = useCustomSnackbar();


  async function handleView(id: string) {
    const FetchInterest = await fetchInterestByTransactionId(id);
    console.log("fetch: ", FetchInterest);

    if (FetchInterest && Array.isArray(FetchInterest)) {

      setUpdatedList(FetchInterest);
      setSelectedRow(id);

    }
    console.log("Data from state", updatedList);

  }


  async function handlePay(transactionId: string) {
    try {
      const paymentAmount = paymentAmounts[transactionId] || 0; // Get the payment amount for this transaction
      const data = {
        Id: transactionId,
        PaidInterestAmount: paymentAmount,
      };
      console.log("data: ", data)
      const response: PaymentResponse = await PayInterestAmount(data);

      console.log("payment success", response);

      handleView(selectedRow);
      if (response.status === 200) {
        snackbar.showSnackbar(
          "Payment Successfully",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        // Perform additional actions for successful payment
      } else {
        console.log("Unexpected response:", response);
        // snackbar.showSnackbar(
        //   error,
        //   "error",
        //   { vertical: "top", horizontal: "center" },
        //   5000
        // );
        // Handle other status codes or unexpected responses
      }
    } catch (error) {
      console.error("Payment failed:", error);

      // Handle payment failure (e.g., show error message)
    }
  }

  const handlePaymentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    transactionId: string
  ) => {
    const { value } = event.target;
    const newPaymentAmounts = {
      ...paymentAmounts,
      [transactionId]: value !== "" ? parseFloat(value) : 0,
    };
    setPaymentAmounts(newPaymentAmounts);
  };

  const formatDate = (inputDate: any) => {
    const [month, year] = inputDate.split("/"); // Split the input string into month and year
    const date = new Date(`${month}/01/${year}`); // Create a date object with the provided month and year
    const formattedDate = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={4}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Principal Amount</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateList?.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>{account.principalAmount}</TableCell>
                    <TableCell>{account.interestRate}</TableCell>
                    <TableCell>
                      {account.interestAmount === 0 ? (
                        <span>Please generate </span>
                      ) : (
                        <Button
                          onClick={() => handleView(account.id)}
                          variant="contained"
                          color="warning"
                        >
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            {updatedList.map((updatedItem, index) => (
              <Box p={3} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {formatDate(updatedItem.emiMonth)}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={3}>
                    <TextField
                      label="Principal Amount"
                      value={updatedItem.principalAmount}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Interest Rate"
                      value={updatedItem.interestRate}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Interest Amount"
                      value={updatedItem.interestAmount.toFixed(2)}
                      disabled
                    />
                  </Grid>
                  {updatedItem.paidInterestAmount === 0 && (
                    <>
                      <Grid item xs={3}>
                        <TextField
                          label="Payment Amount"
                          type="number"
                          value={
                            paymentAmounts[updatedItem.id] !==
                            undefined
                              ? paymentAmounts[updatedItem.id]
                              : ""
                          }
                          onChange={(event: any) =>
                            handlePaymentChange(
                              event,
                              updatedItem.id
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() => handlePay(updatedItem.id)} // Pass transaction ID
                          variant="contained"
                          color="success"
                          style={{ justifyContent: "right", marginTop: "20px" }}
                        >
                          Pay
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
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

export default TransactionsByAccountIdTable;
