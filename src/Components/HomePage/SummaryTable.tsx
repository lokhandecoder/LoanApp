import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetInterestTransactionsForAllAccounts } from '../../Services/TransactionServices';

type Transaction = {
  monthYear: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
};

function SummaryTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetInterestTransactionsForAllAccounts();
        
        // Assuming response.data contains the necessary structure
        const transformedData: Transaction[] = [
          {
            monthYear: response.data.currentMonthYear,
            totalAmount: response.data.currentTransactions[0].totalInterestAmount,
            paidAmount: response.data.currentTransactions[0].paidInterestAmount,
            remainingAmount: response.data.currentTransactions[0].balanceInterestAmount,
          },
          {
            monthYear: response.data.previousMonthYear,
            totalAmount: response.data.previousTransactions[0].totalInterestAmount,
            paidAmount: response.data.previousTransactions[0].paidInterestAmount,
            remainingAmount: response.data.previousTransactions[0].balanceInterestAmount,
          },
          {
            monthYear: response.data.monthBeforePreviousMonthYear,
            totalAmount: response.data.monthBeforePreviousTransactions[0].totalInterestAmount,
            paidAmount: response.data.monthBeforePreviousTransactions[0].paidInterestAmount,
            remainingAmount: response.data.monthBeforePreviousTransactions[0].balanceInterestAmount,
          },
        ];
  
        setTransactions(transformedData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchData();
  }, []);
  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'secondary' }}>
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
              <TableCell>{transaction.totalAmount}</TableCell>
              <TableCell>{transaction.paidAmount}</TableCell>
              <TableCell>{transaction.remainingAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummaryTable;
