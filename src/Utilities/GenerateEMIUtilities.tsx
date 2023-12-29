import React, { useState } from "react";
import { AccountModel } from "../Model/AccountModel";
import { SelectChangeEvent } from "@mui/material/Select";
import { GetAccounts } from "../Services/AccountServices";
import { GenerateEMIforAll, fetchTransactionByAccountID } from "../Services/TransactionServices";
import { TransactionByAccountID, TransactionModelById } from "../Model/TransactionModel";


export const GenerateEMIUtilities = () => {
    const [accountList, setAccountList] = React.useState<AccountModel[]>();
    const [selectedAccountId, setSelectedAccountId] = React.useState<string>("");
    const [isError, setIsError] = React.useState<boolean>(false);
    const [generateList, setGenerateList] = React.useState<TransactionByAccountID[]>();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>();
    // const handleSelectChange = (event: SelectChangeEvent<string>) => {
    //   const value = event.target.value as string;
    //   setSelectedAccountId(value); // Store the selected account ID
    //   setIsError(false); // Reset error when user selects a value
    // };
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value as string;
    
      if (value === 'All') {
        // Handle the 'All' selection separately by resetting the value to an empty string
        setSelectedAccountId('1'); // Set the selected account ID to an empty string
      } else {
        setSelectedAccountId(value); // Store the selected account ID
      }
    
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

   const fetchTransactionByAccountId = async (sendObject: any) => {
    try {
      const response = await fetchTransactionByAccountID(sendObject);
      console.log("res: ", response.data);
      if (Array.isArray(response.data)) {
        const formattedData: TransactionByAccountID[] = response.data.map((item: any) => ({
          id: item.id,
          transactionId: item.transactionId,
          interestRate: item.interestRate,
          principalAmount: item.principalAmount,
          interestAmount: item.interestAmount,
          paidInterestAmount: item.paidInterestAmount,
          emiMonth: item.emiMonth,
          balanceInterestAmount: item.balanceInterestAmount,
          balanceAmount: item.balanceAmount,
          paidAmount: item.paidAmount
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
      if (selectedDate === null || selectedDate === undefined) {
        console.error("Selected date is null or undefined");
        return;
      }
      
      const date = new Date(selectedDate);
      const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
      console.log("Formatted date befor submit:", formattedDate);
      // const month = date.toLocaleString('default', { month: 'long' });
      // const year = date.getFullYear();
      const sendObject = {
        accountId: selectedAccountId,
        EmiMonth: formattedDate
      };
      console.log('Sending object:', sendObject);
      fetchTransactionByAccountId(sendObject)
     
      
    };
  
    const handleReset = () => {
      setSelectedAccountId("");
      setIsError(false); // Reset error on reset button click
      setGenerateList([])
    };
    const handleDateChange = (newDate: Date | null) => {
      if (newDate !== null) {
        // Handle the newDate value
        setSelectedDate(newDate);
      }
    };

    const showGenerateButton = selectedAccountId === "1";


    async function handleGenerateAll (){
      if(showGenerateButton && selectedDate){
        try{
          const date = new Date(selectedDate);
          const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
          console.log("Formatted date befor submit:", formattedDate);
  
          const sendObject = {
            TransactionId: selectedAccountId,
            EmiMonth: formattedDate
          };
          // rest of your code handling date
          const generate = await GenerateEMIforAll(sendObject);
  
          console.log("what is this", generate)
          console.log("res: ", generate.data);
      if (Array.isArray(generate.data)) {
        const formattedData: TransactionByAccountID[] = generate.data.map((item: any) => ({
          id: item.id,
          transactionId: item.transactionId,
          interestRate: item.interestRate,
          principalAmount: item.principalAmount,
          interestAmount: item.interestAmount,
          paidInterestAmount: item.paidInterestAmount,
          emiMonth: item.emiMonth,
          balanceInterestAmount: item.balanceInterestAmount
        }));
    
        console.log("New data from API", formattedData);
        setGenerateList(formattedData);
      }
        }catch(e : any){
  
          console.error(e)
        }
      }
    }
    return {
        selectedAccountId,
        handleSelectChange,
        accountList,
        isError,
        handleSearch,
        handleReset,
        generateList,
        fetchTransactionByAccountId,
        handleDateChange,
        selectedDate,
        showGenerateButton,
        handleGenerateAll,
    }
}