export interface TransactionModel {
    accountID: string;
    principalAmount: number;
    paidAmount: number;
    balanceAmount: number;
    createdDate: Date | null; // Adjust this based on your Day.js import
    updatedDate: Date | null; // Adjust this based on your Day.js import
    createdUserId: string;
    updatedUserId: string;
    startDate: Date | null; // Adjust this based on your Day.js import
    closeDate: Date | null; // Adjust this based on your Day.js import
    interestRate: number;
  }