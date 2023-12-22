import React, { useState } from "react";
import { AccountModel } from "../Model/AccountModel";
import { SelectChangeEvent } from "@mui/material/Select";
import { GetAccounts } from "../Services/AccountServices";
import { fetchTransactionByAccountID } from "../Services/TransactionServices";
import { TransactionByAccountID, TransactionModelById } from "../Model/TransactionModel";


export const GenerateEMIUtilities = () => {
    const [accountList, setAccountList] = React.useState<AccountModel[]>();
    const [selectedAccountId, setSelectedAccountId] = React.useState<string>("");
    const [isError, setIsError] = React.useState<boolean>(false);
    const [generateList, setGenerateList] = React.useState<TransactionByAccountID[]>();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>();
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value as string;
      setSelectedAccountId(value); // Store the selected account ID
      setIsError(false); // Reset error when user selects a value
    };
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
    React.useEffect(() => {

  
      fetchData();
    }, []);
    // const [person, setPerson] = useState

   const fetchTransactionByAccountId = async () => {
    try {
      const response = await fetchTransactionByAccountID(selectedAccountId);
      console.log("res: ", response.data);
      if (Array.isArray(response.data)) {
        const formattedData: TransactionByAccountID[] = response.data.map((item: any) => ({
          id: item.id,
          interestRate: item.interestRate,
          principalAmount: item.principalAmount,
          interestAmount: item.interestAmount,
        }));
    
        console.log("New data from API", formattedData);
        setGenerateList(formattedData);
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      // Handle error during fetching transaction
    }
   }

    const handleSearch = async () => {
      if (!selectedAccountId) {
        setIsError(true);
        return;
      }
  
      console.log('Selected Account ID:', selectedAccountId);
      fetchTransactionByAccountId()
     
      
    };
  
    const handleReset = () => {
      setSelectedAccountId("");
      setIsError(false); // Reset error on reset button click
      setGenerateList([])
    };



    return {
        selectedAccountId,
        handleSelectChange,
        accountList,
        isError,
        handleSearch,
        handleReset,
        generateList,
        fetchTransactionByAccountId,
    }
}