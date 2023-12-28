import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PreviousMonthTransactions from "./PreviousMonthTransactions";
import {
  TransactionByAccountID,
  TransactionModelById,
} from "../../../Model/TransactionModel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Avatar, SvgIcon } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import DashboardCards from "../DashboardCards";
import { MonthData } from "../../../Pages/HomePage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface PreviousMonthProps {
  interestData: { [key: string]: MonthData } | null;
}
function PreviousMonth(props: PreviousMonthProps) {
  const { interestData } = props;

  const totalInterestAmount = interestData?.Month1?.transactions[0]?.totalInterestAmount || 0;
    const balanceInterestAmount = interestData?.Month1?.transactions[0]?.balanceInterestAmount || 0;
    const paidInterestAmount = interestData?.MOnth1?.transactions[0]?.paidInterestAmount || 0;
  return (
    <>
      <Typography variant="subtitle1">Previous Month</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DashboardCards amount={totalInterestAmount} title={"Total Amount"} />
        </Grid>
        <Grid item xs={4}>
          <DashboardCards amount={paidInterestAmount} title={"Paid Amount"} />
        </Grid>
        <Grid item xs={4}>
          <DashboardCards amount={balanceInterestAmount} title={"remainig Amount"} />
        </Grid>
      </Grid>
    </>
  );
}

export default PreviousMonth;
