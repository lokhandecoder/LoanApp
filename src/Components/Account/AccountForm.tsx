import * as React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"; // Import useParams
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { AccountUtilities } from "../../Utilities/AccountUtilities";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AccountForm: React.FC = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const accountId = id ? id : ""; // Check if it's a new account or an existing one
  //alert(accountId);
  //console.log(accountId);
  const createAccountUtility = AccountUtilities(accountId || "");
  const navigate = useNavigate()

  const {
    Account,
    handleChange,
    errors,
    handleFormSubmit,
    handleClear,
    snackbar,
    //fetchAccountDetails, // Function to fetch existing account details
  } = createAccountUtility;

  // React.useEffect(() => {
  //   if (!isNewAccount) {
  //     // Fetch existing account details when ID exists
  //     fetchAccountDetails(); // Implement this function to fetch account details using the ID
  //   }
  // }, [isNewAccount, fetchAccountDetails]);
  return (
    <>
      <Card sx={{ minWidth: 275, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {accountId === "" ? "Create Account" : "Update Account"}
        </Typography>
        <CardContent>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Full Name"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="accountName"
                value={Account.accountName}
                onChange={handleChange}
                error={!!errors.accountName}
                helperText={errors.accountName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Mobile Number"
                variant="outlined"
                autoComplete="off"
                type="number"
                inputProps={{
                  inputMode: "numeric", // Specify numeric input mode
                  pattern: "[0-9]*", // Restrict input to numbers only
                  maxLength: 10, // Set maximum length to 10 digits
                }}
                fullWidth
                name="mobileNo"
                value={Account.mobileNo}
                onChange={handleChange}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Email Address"
                variant="outlined"
                autoComplete="off"
                fullWidth
                name="emailAddress"
                value={Account.emailAddress}
                onChange={handleChange}
                error={!!errors.emailAddress}
                helperText={errors.emailAddress}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your AadharCard Details"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="adharcard"
                value={Account.adharcard}
                onChange={handleChange}
                error={!!errors.adharcard}
                helperText={errors.adharcard}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your PanCard Details"
                variant="outlined"
                fullWidth
                autoComplete="off"
                name="pancard"
                value={Account.pancard}
                onChange={handleChange}
                error={!!errors.pancard}
                helperText={errors.pancard}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              container
              alignItems="center"
            >
              <Checkbox
                color="success"
                checked={Account.isActive ? true : false} // Convert to boolean
                onChange={handleChange}
                name="isActive"
              />
              <Typography variant="body1">is Active</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              alignItems="center"
            >
              <TextField
                error={!!errors.adderss}
                sx={{ mt: 1 }}
                id="adderss"
                name="adderss"
                label="Address"
                multiline
                                autoComplete="off"
                rows={4}
                value={Account.adderss}
                onChange={handleChange}
                helperText={errors.adderss}
                fullWidth
                // inputProps={{
                //   maxLength: 250 // Set the maximum length here
                // }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
          >
            {accountId === "" ? "Create" : "Update"}
          </Button>
          <Button onClick={handleClear} variant="contained" color="secondary">
            Clear
          </Button>
          <Button onClick={() => navigate('/accounts')} variant="contained" color="secondary">
            Accounts
          </Button>
        </CardActions>
      </Card>
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
};

export default AccountForm;
