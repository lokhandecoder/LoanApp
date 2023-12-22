import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TransactionModelById } from '../../Model/TransactionModel';
import Button from "@mui/material/Button";


interface TransactionsByAccountIdTableProps {
    generateList: TransactionModelById[];
  }
function TransactionsByAccountIdTable(props: TransactionsByAccountIdTableProps) {
    const { generateList } = props;
    async function handleGenerate(id: string) {
        // Perform actions with the id (e.g., sending it somewhere)
        console.log(`Generating for ID: ${id}`);
        if (id) {
        //   const generate = await GenerateEMIbyTrnsactionID(id);
          // Perform further actions with the result of GenerateEMIbyTrnsactionID
        }
    }
        // Y
  return (
    <>
    <TableContainer component={Paper} style={{ marginTop: "20px" }}  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "secondary" /* Your desired text color */,
            }}
          >
            <TableCell>Principal Amount </TableCell>
            <TableCell>interest Rate </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateList?.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.principalAmount}</TableCell>
              <TableCell>{account.interestRate}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleGenerate(account.id)}
                  variant="contained"
                  color="primary"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default TransactionsByAccountIdTable