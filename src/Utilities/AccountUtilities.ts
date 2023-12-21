import { AccountModel } from "../Model/AccountModel";
import React, { useEffect, useState } from "react";
import { createAccountService, fetchAccountById, updateAccountService } from "../Services/AccountServices";
import useCustomSnackbar from "../Components/Fixed/useCustomSnackbar";
import { json } from "stream/consumers";
import { useNavigate } from "react-router-dom";



export const AccountUtilities = (AccountId: string) => {
  //const isNewAccount = !id;
  const initialState: AccountModel = {
    id:AccountId,
    accountName: "",
    mobileNo: "",
    emailAddress: "",
    isActive: false,
    adderss: "",
    panCard : "",
    adharCard : "",
  };
  const [Account, setAccount] = React.useState<AccountModel>(initialState);
  const [errors, setErrors] = React.useState<Partial<AccountModel>>({});
  const snackbar = useCustomSnackbar();
  const navigate = useNavigate();

  const AccountServiceSend = async () => {
    try {
     
      let sendData ;
      console.log("data: ", Account.id)
      if (Account.id === ""){
        sendData = await createAccountService(Account);
      }else{
        sendData = await updateAccountService(Account);
      }


      console.log("senddata", sendData);
      if (sendData.status === 200) {
        snackbar.showSnackbar(
          "Account Created Successfully",
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
    } catch (e: any) {
      console.log("error from send", e);
      snackbar.showSnackbar(
        e,
        "error",
        { vertical: "top", horizontal: "center" },
        5000
      );
    }
  };

  const handleFormSubmit = () => {
    
    const hasError = fieldError();
    console.log("haserror", hasError);
    if (!hasError) {
      console.log("Form submitted successfully!");
      console.log(Account);
      AccountServiceSend();
      handleClear();
    } else {
      console.log("Please fill in all the required fields!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;
  
    // Limit the mobile number to 10 digits
    if (name === 'mobileNo' && typeof fieldValue === 'string') {
      fieldValue = fieldValue.slice(0, 10); // Take only the first 10 characters
    }
  
    setAccount((prevState) => ({
      ...prevState,
      [name]: fieldValue,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleClear = () => {
    setAccount(initialState);
    setErrors({});
  };

  const fieldError = (): boolean => {
    let hasAnyError = false;
    const { accountName, mobileNo, emailAddress , adderss, adharCard, panCard } = Account;
    const newErrors: Partial<AccountModel> = {};

    if (accountName === "") {
      newErrors.accountName = "Please enter your Full Name";
      hasAnyError = true;
    } else {
      newErrors.accountName = "";
    }
    // if (adderss === "") {
    //   newErrors.adderss = "Please enter your complete";
    //   hasAnyError = true;
    // } else {
    //   newErrors.adderss = "";
    // }
    // if (adharCard === "") {
    //   newErrors.adharCard = "Please enter your Adhar card details";
    //   hasAnyError = true;
    // } else {
    //   newErrors.adharCard = "";
    // }
    // if (panCard === "") {
    //   newErrors.panCard = "Please enter your pan card details";
    //   hasAnyError = true;
    // } else {
    //   newErrors.panCard = "";
    // }

    if (mobileNo === "") {
      newErrors.mobileNo = "Please enter your Mobile Number";
      hasAnyError = true;
    } else if (!isValidMobileNo(mobileNo)) {
      newErrors.mobileNo = "Please enter a valid Mobile Number";
      hasAnyError = true;
    } else {
      newErrors.mobileNo = "";
    }

    // if (emailAddress === "") {
    //   newErrors.emailAddress = "Please enter your Email Address";
    //   hasAnyError = true;
    // } else if (!isValidEmail(emailAddress)) {
    //   newErrors.emailAddress = "Please enter a valid Email Address";
    //   hasAnyError = true;
    // } else {
    //   newErrors.emailAddress = "";
    // }

    setErrors(newErrors);
    return hasAnyError;
  };

  const isValidMobileNo = (mobileNo: string): boolean => {
    const mobileNoRegex = /^[0-9]{10}$/; // Example: 10-digit mobile number regex
    return mobileNoRegex.test(mobileNo);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
    return emailRegex.test(email);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (AccountId) {
          const response = await fetchAccountById(AccountId);
          setAccount(response.data);
          console.log("new data", response.data)
        }
      } catch (error) {
        console.error(
          "Error fetching user role mappings: " + (error as Error).message
        );
      }
    }

    if (AccountId) {
      fetchData();
    } else {
      // Reset to initial state if there's no AccountId
      setAccount(initialState);
    }
  }, [AccountId]);
  // const fetchAccountDetails = React.useCallback(async () => {
  //   if (id) {
  //     try {
  //       const accountDetails = await fetchAccountById(id); // Replace with your fetching logic
  //       setAccount(accountDetails);
  //       console.log("fetch by id",accountDetails)
  //     } catch (error) {
  //       console.error("Error fetching account details:", error);
  //       // Handle error if fetching fails
  //     }
  //   }
  // }, [id]); // Adding 'id' as a dependency
  // React.useEffect(() => {
  //   if (!isNewAccount) {
  //     fetchAccountDetails();
  //   }
  // }, [isNewAccount, fetchAccountDetails]);
  return {
    Account,
    handleChange,
    errors,
    handleFormSubmit,
    handleClear,
    snackbar,
    //fetchAccountDetails, // Include the fetchAccountDetails function in the return object
  };
};
