export interface TransactionModel {
    AccountId: string;
    PrincipalAmount: number;
    PaidAmount: number;
    BalanceAmount: number;
    CreatedDate: string | null; // Adjust this based on your Day.js import
    UpdatedDate: string | null; // Adjust this based on your Day.js import
    CreatedUserId: string;
    UpdatedUserId: string;
    StartDate: string | null; // Adjust this based on your Day.js import
    CloseDate: string | null; // Adjust this based on your Day.js import
    InterestRate: number;
  }
export interface TransactionModelById{
    id: string;
    accountId: string;
    principalAmount: string | null;
    paidAmount: number | "";
    balanceAmount: number | "";
    createdDate: string | null
    updatedDate: string | null;
    createdUserId: string;
    updatedUserId: string;
    startDate: string | null;
    closeDate: string | null;
    interestRate: number | "";
}