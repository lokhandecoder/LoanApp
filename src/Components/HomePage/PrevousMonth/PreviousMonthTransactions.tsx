import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TransactionByAccountID, TransactionModelById } from "../../../Model/TransactionModel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
interface PreviousMonthTransactionsProps {
    transactions: TransactionModelById[];
  }
function PreviousMonthTransactions(props: PreviousMonthTransactionsProps) {
    const { transactions } = props;

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="subtitle1">
            Previous Month Transaction
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "secondary" /* Your desired text color */,
                  }}
                >
                  <TableCell>Account Name</TableCell>
                  <TableCell>principalAmount </TableCell>
                  <TableCell>balanceAmount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>{account.principalAmount}</TableCell>
                    <TableCell>{account.balanceAmount}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
  
        </CardActions>
      </Card>
    </>
  );
}

export default PreviousMonthTransactions;
