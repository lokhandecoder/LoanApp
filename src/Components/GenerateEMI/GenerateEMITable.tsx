import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  TransactionByAccountID,
  TransactionModelById,
} from "../../Model/TransactionModel";
import { GenerateEMIbyTrnsactionID } from "../../Services/TransactionServices";
interface SendObjectType {
  accountId: string;
  EmiMonth: string;
}
interface GenerateEMITableProps {
  generateList: TransactionByAccountID[];
  fetchTransactionByAccountId: (sendObject: SendObjectType) => Promise<void>; // Update the function to accept an argument
  selectedAccountId: string;
  selectedDate: Date | null;

}

function GenerateEMITable(props: GenerateEMITableProps) {
  const { generateList, fetchTransactionByAccountId, selectedAccountId,selectedDate  } = props;

  async function handleGenerate(id: string) {
    console.log(`Generating for ID: ${id}`);
    if (id) {
      const generate = await GenerateEMIbyTrnsactionID(id);
      if (selectedDate !== null) {
        const date = new Date(selectedDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const sendObject = {
          accountId: selectedAccountId,
          EmiMonth: `${month} ${year}`
        };
        console.log('Sending object:', sendObject);
        fetchTransactionByAccountId(sendObject);
        // rest of your code handling date
      }
      
    }
  }

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "secondary" }}>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Principal Amount</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Interest Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateList?.map((account, index) => (
              <TableRow key={index}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.principalAmount}</TableCell>
                <TableCell>{account.interestRate}</TableCell>
                <TableCell>{account.interestAmount}</TableCell>
                <TableCell>
                  {account.interestAmount === 0 ? (
                    <Button
                      onClick={() => handleGenerate(account.id)}
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default GenerateEMITable;