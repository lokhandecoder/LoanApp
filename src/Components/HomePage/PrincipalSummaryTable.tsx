import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  GetPrincipalTransactionsDetailAsync,
} from "../../Services/TransactionServices";

type Transaction = {
  monthYear: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
};

function PrincipalSummaryTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPrincipalTransactionsDetailAsync();

        const transactionsData = [
          { key: "current", data: response.data.currentTransactions },
          { key: "previous", data: response.data.previousTransactions },
          {
            key: "monthBeforePrevious",
            data: response.data.monthBeforePreviousTransactions,
          },
        ];

        const transformedData: Transaction[] = transactionsData.map(
          ({ key, data }) => {
            const monthYear = response.data[`${key}MonthYear`];
            const transactionData = data; // Assuming the data is an object, not an array

            return {
              monthYear,
              totalAmount: transactionData.totalPrincipalAmount || 0,
              paidAmount: transactionData.totalPaidAmount || 0,
              remainingAmount: transactionData.totalBalanceAmount || 0,
            };
          }
        );

        setTransactions(
          transformedData.map((transaction) => ({
            ...transaction,
            monthYear: convertToFormattedMonth(transaction.monthYear),
          }))
        );
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchData();
  }, []);

  const convertToFormattedMonth = (monthYear: string): string => {
    const [month, year] = monthYear.split("/");
    const monthName = getMonthName(Number(month));
    return `${monthName} ${year}`;
  };

  const getMonthName = (month: number): string => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month - 1];
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "secondary" }}>
              <TableCell>Months</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>Remaining Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.monthYear}</TableCell>
                <TableCell>{transaction.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{transaction.paidAmount.toFixed(2)}</TableCell>
                <TableCell>{transaction.remainingAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PrincipalSummaryTable;
