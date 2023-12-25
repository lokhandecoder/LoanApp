import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  TransactionByAccountID,
  TransactionModelById,
} from "../../Model/TransactionModel";
import { IndeterminateCheckBoxSharp } from "@mui/icons-material";

interface TransactionsByAccountIdTableProps {
  generateList: TransactionByAccountID[];
}

function TransactionsByAccountIdTable(
  props: TransactionsByAccountIdTableProps
) {
  const { generateList } = props;
  const [selectedRow, setSelectedRow] =
    React.useState<TransactionByAccountID | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  async function handleView(id: string) {
    // Find the selected row based on the ID
    const selected = generateList.find((account) => account.id === id);
    if (selected) {
      setSelectedRow(selected);
    }
  }

  function handlePay() {
    if (selectedRow) {
      // Perform actions for payment using the selectedRow details
      console.log(`Paying for ID: ${selectedRow.id}`);
      // Perform further actions for payment
    }
  }

  return (
    <>
  <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper} >
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
        <Grid item xs={12} sm={6}>
          <Paper>
            {selectedRow && (
              <Box p={3}>
                <Typography>
                  Principal Amount: {selectedRow.principalAmount}
                </Typography>
                <Typography>
                  Interest Rate: {selectedRow.interestRate}
                </Typography>
                <Typography>
                  Interest Amount: {selectedRow.interestAmount}
                </Typography>

                {/* Add more details as needed */}
                <Button
                  onClick={handlePay}
                  variant="contained"
                  color="success"
                  style={{ justifyContent: "right" }}
                >
                  Pay
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default TransactionsByAccountIdTable;
