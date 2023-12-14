import * as React from "react";
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
  const createAccpuntUtility = AccountUtilities();

  const {
    Account,
    handleChange,
    errors,
    handleFormSubmit,
    handleClear,
    snackbar,
  } = createAccpuntUtility;
  return (
    <>
      <Card sx={{ minWidth: 275 , mt : 3 }}>
      <Typography variant="h5" gutterBottom>Create Account</Typography>
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
                fullWidth
                name="emailAddress"
                value={Account.emailAddress}
                onChange={handleChange}
                error={!!errors.emailAddress}
                helperText={errors.emailAddress}
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
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button onClick={handleClear} variant="contained" color="secondary">
            Clear
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
