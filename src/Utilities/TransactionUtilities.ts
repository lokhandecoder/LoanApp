import dayjs from "dayjs";
import * as React from "react";
import { useParams } from "react-router";
import { TransactionModel, TransactionModelById } from "../Model/TransactionModel";
import { AccountModel } from "../Model/AccountModel";
import { GetAccounts } from "../Services/AccountServices";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  CreateTransaction,
  UpdateTransaction,
  fetchTransactionByID,
} from "../Services/TransactionServices";
import useCustomSnackbar from "../Components/Fixed/useCustomSnackbar";
import { createAsExpression } from "typescript";
import { useNavigate } from "react-router-dom";

export const TransactionUtilities = (transactionId: string) => {
  const today = dayjs();
  const todayDate = today.format("YYYY-MM-DD");
  const snackbar = useCustomSnackbar();
  const navigate = useNavigate();


  // const parsedTodayDate = dayjs(todayDate).toDate(); // Parse the string to a Date object

  const [errors, setErrors] = React.useState<{
    [key: string]: string | null;
  }>({});
  const [accountList, setAccountList] = React.useState<AccountModel[]>();

  const initialState: TransactionModelById = {
    id : transactionId || '',
    accountName : "",
    accountId: "",
    principalAmount: 0, // Set default numeric value instead of null
    paidAmount: 0, // Set default numeric value instead of null
    balanceAmount: 0, // Set default numeric value instead of null
    createdDate: todayDate,
    updatedDate: todayDate,
    createdUserId: '',
    updatedUserId: "",
    startDate: todayDate,
    closeDate: todayDate,
    interestRate: 0, // Set default numeric value instead of null
  };

  const [createTransaction, setCreateTransaction] =
    React.useState<TransactionModelById>(initialState);

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
    console.log("handlechange create transaction", createTransaction)
  };
  // const handleChange = (
  //     fieldName: keyof TransactionModel,
  //     value: string | number | boolean
  //   ) => {
  //     setCreateTransaction({ ...createTransaction, [fieldName]: value });
  //   };
  const handleDateChange = (date: Date | null, fieldName: string) => {
    const formattedDate = date ? dayjs(date).toDate() : todayDate;

    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      [fieldName]: formattedDate,
    }));
  };

const handleTransactionlIst = () => {
  navigate('/transactions')
}

  
  const handleSave = async () => {
    const hasError = fieldError();
  
    if (!hasError) {
      const formattedTransaction = {
        ...createTransaction,
        createdUserId: createTransaction.accountId,
        updatedUserId: createTransaction.accountId,
        startDate : dayjs(createTransaction.startDate).format("YYYY-MM-DD"),
        closeDate : dayjs(createTransaction.closeDate).format("YYYY-MM-DD"),
      };
  
      console.log("Form Submitted", formattedTransaction);
      let sendData ;

      try {
        if (createTransaction.id !== "") {
          // Update operation
          // console.log("formateeed data", formattedTransaction)
           sendData = await UpdateTransaction(formattedTransaction, transactionId);
          console.log("Updated Result:", sendData);
        } else {
          // Create operation
           sendData = await CreateTransaction(formattedTransaction);
          console.log("Created Result:", sendData);
        }
       
      } catch (error: any) {
        console.log("Error:", error);
        snackbar.showSnackbar(
          error,
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
      }
      if (sendData.status === 200) {
        snackbar.showSnackbar(
          "Transaction Created Successfully",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
      } else {
        snackbar.showSnackbar(
          sendData.error,
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
      }

    } else {
      console.log("Error found");
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string; // Extract the value directly

    setCreateTransaction((prevTransaction) => ({
      ...prevTransaction,
      accountId: value,
    }));
  };
  const fieldError = (): boolean => {
    let hasAnyError = false;
    const { accountId, principalAmount, paidAmount, interestRate, balanceAmount } = createTransaction;
    const newErrors: { [key: string]: string | null } = {}; // Corrected object type syntax
    
    if (!accountId.trim()) {
      newErrors.accountId = "Please select account name"; // Assign error message to newErrors
      hasAnyError = true;
    } else {
      newErrors.accountId = null; // No error, set to null
    }
   
    if (principalAmount === 0 || principalAmount === null  ) {
      newErrors.principalAmount = "Please enter a non-zero principal amount"; // Assign error message to newErrors
      hasAnyError = true;
    } else {
      newErrors.principalAmount = null; // No error, set to null
    }
    if (interestRate === 0 || interestRate === null  ) {
      newErrors.interestRate = "Please enter a non-zero interest rate"; // Assign error message to newErrors
      hasAnyError = true;
    } else {
      newErrors.interestRate = null; // No error, set to null
    }
    
  
    // Assuming setErrors is a function that updates the state with newErrors
    setErrors(newErrors);
  
    // Returning the error status
    return hasAnyError;
  };
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAccounts();
        if (Array.isArray(response)) {
          setAccountList(response);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (transactionId) {
          const response = await fetchTransactionByID(transactionId);
          if (response.data) {
            setCreateTransaction((prevTransaction) => ({
              ...prevTransaction,
              ...response.data,
            }));
          }
          console.log("res: ", response.data);
        } else {
          setCreateTransaction(initialState);
        }
      } catch (error) {
        console.error(
          "Error fetching transaction data: " + (error as Error).message
        );
      }
    };

    fetchData();
  }, [transactionId]);

  return {
    createTransaction,
    handleChange,
    handleDateChange,
    handleSave,
    errors,
    snackbar,
    accountList,
    handleSelectChange,
    handleTransactionlIst,
  };
};
