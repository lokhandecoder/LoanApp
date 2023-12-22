import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  TransactionByAccountID,
  TransactionModel,
  TransactionModelById,
} from "../../Model/TransactionModel";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { DeleteForeverOutlined } from "@mui/icons-material";
import {
  DeleteTransaction,
  GenerateEMIbyTrnsactionID,
  GetTransactions,
} from "../../Services/TransactionServices";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Fixed/ConfirmationDialog";
import Button from "@mui/material/Button";  

interface GenerateEMITableProps {
  generateList: TransactionByAccountID[];
  fetchTransactionByAccountId: () => Promise<void>; // Adjust the type of fetchData to match the async function
}
function GenerateEMITable(props: GenerateEMITableProps) {
  const { generateList, fetchTransactionByAccountId} = props;
  // const [lists, setLists] = React.useState<TransactionModelById[]>([]); // Specify AccountModel as the state type

  async function handleGenerate(id: string) {
    // Perform actions with the id (e.g., sending it somewhere)
    console.log(`Generating for ID: ${id}`);
    if (id) {
      const generate = await GenerateEMIbyTrnsactionID(id);
      fetchTransactionByAccountId()
      // Perform further actions with the result of GenerateEMIbyTrnsactionID
    }
    // You can perform other actions using the id here
  }
  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "secondary" /* Your desired text color */,
              }}
            >
              <TableCell>Transaction ID </TableCell>
              <TableCell>Principal Amount </TableCell>
              <TableCell>interest Rate </TableCell>
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
                  <Button
                    onClick={() => handleGenerate(account.id)}
                    variant="contained"
                    color="primary"
                  >
                    Generate
                  </Button>
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
