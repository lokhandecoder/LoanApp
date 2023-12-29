import React, { useEffect, useState } from "react";
import { GetAccountsAndUnpaidInterestAsync, GetUnpaidPrincipalAmountAsync } from "../../Services/TransactionServices";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";

interface TransactionData {
    accountId: string;
    accountName: string,
    transactionId: string,
    principalAmount: number;
    balanceAmount: number;
}

function PendingPrincipalAmountTable() {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [monthLabels, setMonthLabels] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GetUnpaidPrincipalAmountAsync();
          if (response.data) {
            const fetchedData = response.data;
            const transformedData: TransactionData[] = [];
  
            // Function to get the actual month name from MM/YYYY format
            const getMonthNameFromDateString = (dateString: string) => {
              const [month, year] = dateString.split('/');
              const dateObj = new Date(Number(year), Number(month) - 1, 1);
              return dateObj.toLocaleString('default', { month: 'long' });
            };
  
            const addTransactionIfNonZeroInterest = (
              transactions: any[],
              monthLabel: string,
              monthYear: string
            ) => {
              transactions.forEach((transaction: any) => {
                if (transaction.interestAmount !== 0) {
                  transformedData.push({
                    ...transaction,
                    emiMonth: getMonthNameFromDateString(monthYear),
                  });
                }
              });
            };
  
            addTransactionIfNonZeroInterest(
              fetchedData.currentMonth,
              "Current Month",
              fetchedData.currentMonthYear
            );
            addTransactionIfNonZeroInterest(
              fetchedData.previousMonth,
              "Previous Month",
              fetchedData.previousMonthYear
            );
            addTransactionIfNonZeroInterest(
              fetchedData.monthBeforePreviousMonth,
              "Month Before Previous",
              fetchedData.monthBeforePreviousMonthYear
            );
  
            setTransactions(transformedData);
            setMonthLabels([
              getMonthNameFromDateString(fetchedData.currentMonthYear),
              getMonthNameFromDateString(fetchedData.previousMonthYear),
              getMonthNameFromDateString(fetchedData.monthBeforePreviousMonthYear),
            ]);
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };
      fetchData();
    }, []);
  return (
    <>
    <Paper>
      <Typography variant="subtitle1">Pending Principal Amount</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>EMI Month</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Princiapal Amount</TableCell>
            <TableCell>Balanced Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.accountId}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell>{transaction.principalAmount}</TableCell>
              <TableCell>{transaction.balanceAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </>
  )
}

export default PendingPrincipalAmountTable