import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import { GetAccounts } from "../Services/CreateAccountServices";

  
  function Accounts() {
    const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
          const accountsData = await GetAccounts();
          console.log("new Data", accountsData)
          setData(accountsData); // Corrected variable name here
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      };

    fetchData();
  }, []);
  return (
    <>
      <LayoutComponent>
        < >
          <TableContainer component={Paper} style={ { marginTop : "20px"}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </LayoutComponent>
    </>
  );
}

export default Accounts;
