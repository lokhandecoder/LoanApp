import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import { DeleteAccount, GetAccounts } from "../Services/AccountServices";
import { AccountModel } from "../Model/AccountModel";
import Button from "@mui/material/Button";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Components/Fixed/ConfirmationDialog";
function Accounts() {
  const [accounts, setAccounts] = React.useState<AccountModel[]>([]); // Specify AccountModel as the state type
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] =
    React.useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = React.useState<
    string | null
  >(null);

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await GetAccounts(); // Replace with your API call

      // Check if the response is an array before mapping over it
      console.log("response", response);
      if (Array.isArray(response)) {
        const formattedData: AccountModel[] = response.map((item: any) => ({
          id: item.id,
          accountName: item.accountName,
          mobileNo: item.mobileNo,
          emailAddress: item.emailAddress,
          isActive: item.isActive,
          adderss: item.adderss,
          pancard: item.panCard,
          adharcard: item.adharCard,
        }));

        console.log("New data from API", formattedData);
        setAccounts(formattedData);
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
  const handleConfirmationClose = async (value: string) => {
    setOpenConfirmation(false); // Set openConfirmation to false to close the dialog
    if (value === "yes" && selectedAccountId !== null) {
      try {
        // Assuming DeleteAccount expects a string as an argument
        const deleteAccount = await DeleteAccount(selectedAccountId);
        console.log(deleteAccount);
        fetchData();
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };
  

  const handleEdit = (id: string) => {
    const editUrl = id ? `/account/${id}` : "/account";
    navigate(editUrl);
  };
  async function handleDelete(id: string) {
    setOpenConfirmation(true)
    setSelectedAccountId(id)
    // try {
    //   // Assuming DeleteAccount expects a number as an argument
    //   const deleteAccount = await DeleteAccount(id);
    //   console.log(deleteAccount);
    //   // alert(id);
    //   fetchData();
    // } catch (error) {
    //   console.error("Error deleting account:", error);
    // }
  }

  return (
    <>
      <LayoutComponent>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => navigate("/account")}
              variant="contained"
              color="primary"
            >
              Add New Account
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
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Adhar Card</TableCell>
                  <TableCell>Pancard </TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts?.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>{account.mobileNo}</TableCell>
                    <TableCell>{account.emailAddress}</TableCell>
                    <TableCell>{account.adharcard}</TableCell>
                    <TableCell>{account.pancard}</TableCell>
                    <TableCell>{account.adderss}</TableCell>
                    <TableCell>{account.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {/* <Button
                        onClick={handleEdit}
                        variant="contained"
                        color="primary"
                      >
                      Edit
                      </Button>
                      <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button> */}
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
          </TableContainer>
          <ConfirmationDialog
            isOpen={openConfirmation}
            handleClose={handleConfirmationClose}
            message="Are you sure you want to delete this account"
          />
        </>
      </LayoutComponent>
    </>
  );
}

export default Accounts;
