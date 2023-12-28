import React from 'react'
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
  import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MonthData } from '../../../Pages/HomePage';

interface CurrentMonthProps {
    interestData: { [key: string]: MonthData } | null;
  }


function CurrentMonth(props: CurrentMonthProps) {

    const { interestData } = props;
    const totalInterestAmount = interestData?.Month0?.transactions[0]?.totalInterestAmount || 0;
    const balanceInterestAmount = interestData?.Month0?.transactions[0]?.balanceInterestAmount || 0;
    const paidInterestAmount = interestData?.MOnth0?.transactions[0]?.paidInterestAmount || 0;

  return (
    <>
    <Typography variant="subtitle1">Current Month</Typography>
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
  )
}

export default CurrentMonth