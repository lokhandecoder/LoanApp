import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TransactionModel, TransactionModelById } from "../../Model/TransactionModel";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { DeleteTransaction, GetTransactions } from "../../Services/TransactionServices";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Fixed/ConfirmationDialog";
import Button from "@mui/material/Button";

function TransactionTable() {
    const navigate = useNavigate()
    const [openConfirmation, setOpenConfirmation] =
    React.useState<boolean>(false);
    const [selectedAccountId, setSelectedAccountId] = React.useState<
    string | null
  >(null);
    const [accounts, setAccounts] = React.useState<TransactionModelById[]>([]); // Specify AccountModel as the state type
    const fetchData = async () => {
        try {
          // Fetch data from the API
          const response = await GetTransactions(); // Replace with your API call
    
          // Check if the response is an array before mapping over it
          console.log("response", response);
          if (Array.isArray(response)) {
            const formattedData: TransactionModelById[] = response.map((item: any) => ({
              id: item.id,
              accountName: item.accountName,
              accountId: item.accountId,
              principalAmount: item.principalAmount,
              paidAmount: item.paidAmount,
              balanceAmount: item.balanceAmount,
              createdDate: item.createdDate,
              updatedDate: item.updatedDate,
              createdUserId: item.createdUserId,
              updatedUserId: item.updatedUserId,
              startDate: item.startDate,
              closeDate: item.closeDate,
              interestRate: item.interestRate,
            }));
          
            console.log("Formatted Data:", formattedData);
            setAccounts(formattedData)
            // Use the formattedData as needed
          
    
            // console.log("New data from API", formattedData);
            // setAccounts(formattedData);
          } else {
            console.error("API response is not an array:", response);
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };
      React.useEffect(() => {
        fetchData();
      }, []);

      const handleEdit = (id : string) => {
        // alert(id)
        navigate(`/transaction/${id}`)

      }
      async function handleDelete(id: string) {
        setOpenConfirmation(true);
        setSelectedAccountId(id);

      }
      const handleConfirmationClose = async (value: string) => {
        setOpenConfirmation(false); // Set openConfirmation to false to close the dialog
        if (value === "yes" && selectedAccountId !== null) {
          try {
            // Assuming DeleteAccount expects a string as an argument
            const deleteAccount = await DeleteTransaction(selectedAccountId);
            console.log(deleteAccount);
            fetchData();
          } catch (error) {
            console.error("Error deleting account:", error);
          }
        }
      };

      
  return (
    <>
    <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => navigate("/transaction")}
              variant="contained"
              color="primary"
            >
              Add New Transaction
            </Button>
          </div>
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "secondary" /* Your desired text color */,
                  }}
                >
                  <TableCell>Account Name</TableCell>
                  <TableCell>principalAmount </TableCell>
                  <TableCell>balanceAmount</TableCell>
                  <TableCell>paidAmount</TableCell>
                  <TableCell>interestRate </TableCell>
                  <TableCell>startDate</TableCell>
                  <TableCell>closeDate</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts?.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>{account.principalAmount}</TableCell>
                    <TableCell>{account.balanceAmount}</TableCell>
                    <TableCell>{account.paidAmount}</TableCell>
                    <TableCell>{account.interestRate}</TableCell>
                    <TableCell>{account.startDate}</TableCell>
                    <TableCell>{account.closeDate}</TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="Edit"
                            onClick={() => handleEdit(account.id)}
                            style={{ color: "blue" }} // Change the color here
                          >
                            <EditNoteOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="Delete"
                            onClick={() => handleDelete(account.id)}
                            style={{ color: "red" }} // Change the color here
                          >
                            <DeleteForeverOutlined />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ConfirmationDialog
            isOpen={openConfirmation}
            handleClose={handleConfirmationClose}
            message="Are you sure you want to delete this Transaction"
          />
          </TableContainer>
    </>
  )
}

export default TransactionTable