import dayjs from "dayjs";
import * as React from "react";
import { useParams } from "react-router";
import { TransactionModel } from "../Model/TransactionModel";


export const TransactionUtilities = () => {
    const today = dayjs();
    const todayDate = today.toDate();
    const [errors, setErrors] = React.useState<Partial<TransactionModel>>({});
    const { id } = useParams(); // Get the ID parameter from the URL
    const accountId = id ? id : ""; // Check if it's a new account or an existing one
    const [createTransaction, setCreateTransaction] =
      React.useState<TransactionModel>({
        accountID: "",
        principalAmount: 0,
        paidAmount: 0,
        balanceAmount: 0,
        createdDate: todayDate,
        updatedDate: null,
        createdUserId: "",
        updatedUserId: "",
        startDate: todayDate,
        closeDate: todayDate,
        interestRate: 0,
      });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
  
      setCreateTransaction((prevTransaction) => ({
        ...prevTransaction,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? parseFloat(value)
            : value,
      }));
    };
    const handleDateChange = (date: Date | null, fieldName: string) => {
      const formattedDate = date ? dayjs(date).toDate() : todayDate;
  
      setCreateTransaction((prevTransaction) => ({
        ...prevTransaction,
        [fieldName]: formattedDate,
      }));
    };
  
    const handleSave = () => {
      // Add logic to save the transaction data
      const hasError = fieldError();
      if(!hasError){
        console.log("form Submitted", createTransaction)
      }else{
        console.log("error found")
      }
    };

    const fieldError = (): boolean => {
        let hasAnyError = false;
        const {
            accountID,
            principalAmount,
            paidAmount,
            balanceAmount,
            interestRate
        } = createTransaction;
        const newErrors: Partial<TransactionModel> = {};
    
        if (!accountID.trim()) {
            newErrors.accountID = "Please enter your Account Number";
            hasAnyError = true;
        } else {
            newErrors.accountID = "";
        }
        if (principalAmount === 0 && principalAmount !== createTransaction.principalAmount) {
            newErrors.principalAmount = 0;
            hasAnyError = true;
        } else {
            newErrors.principalAmount = 0;
        }
        if (paidAmount === 0 && paidAmount !== createTransaction.paidAmount) {
            newErrors.paidAmount = 0;
            hasAnyError = true;
        } else {
            newErrors.paidAmount = 0;
        }
        if (balanceAmount === 0 && balanceAmount !== createTransaction.balanceAmount) {
            newErrors.balanceAmount = 0;
            hasAnyError = true;
        } else {
            newErrors.balanceAmount = 0;
        }
        if (interestRate === 0 && interestRate !== createTransaction.interestRate) {
            newErrors.interestRate = 0;
            hasAnyError = true;
        } else {
            newErrors.interestRate = 0;
        }
    
        setErrors(newErrors);
        return hasAnyError;
    };
    
    

    return{
        accountId,
        createTransaction,
        handleChange,
        handleDateChange,
        handleSave,
        errors,

    }
}