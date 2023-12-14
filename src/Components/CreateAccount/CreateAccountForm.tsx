import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createAccountModel } from "../../Model/createAccount";
import Checkbox from "@mui/material/Checkbox";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const label = { inputProps: { "aria-label": "is Active" } };
function CreateAccountForm() {
  const [createAccount, setcreateAccount] = React.useState<createAccountModel>({
    accountName: "",
    mobileNo: "",
    emailAddress: "",
    isActive: false,
    // leaveReason: "", // Add leaveReason field to the state
  });
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
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
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your MObile Number"
                variant="outlined"
                fullWidth
                name="mobileNo"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter your Email Address"
                variant="outlined"
                fullWidth
                name="emailAddress"
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
              <Checkbox {...label}  color="success" />
              <Typography variant="body1">is Active</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}

export default CreateAccountForm;
