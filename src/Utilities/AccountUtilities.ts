import { AccountModel } from "../Model/createAccount";
import * as React from "react";
import { createAccountService } from "../Services/CreateAccountServices";
import useCustomSnackbar from "../Components/Fixed/useCustomSnackbar";

const initialState: AccountModel = {
  accountName: "",
  mobileNo: "",
  emailAddress: "",
  isActive: false,
  // leaveReason: "", // Add leaveReason field to the state
};
export const AccountUtilities = () => {
  const [Account, setAccount] = React.useState<AccountModel>(initialState);
  const [errors, setErrors] = React.useState<Partial<AccountModel>>({});
  const snackbar = useCustomSnackbar();

  const AccountServiceSend = async () => {
    try {
      const sendData = await createAccountService(Account);
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
    const fieldValue = type === "checkbox" ? checked : value;
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
    const { accountName, mobileNo, emailAddress } = Account;
    const newErrors: Partial<AccountModel> = {};

    if (accountName === "") {
      newErrors.accountName = "Please enter your Full Name";
      hasAnyError = true;
    } else {
      newErrors.accountName = "";
    }
    if (mobileNo === "") {
      newErrors.mobileNo = "Please enter your Mobile Number";
      hasAnyError = true;
    } else {
      newErrors.mobileNo = "";
    }
    if (emailAddress === "") {
      newErrors.emailAddress = "Please enter your Email Address";
      hasAnyError = true;
    } else {
      newErrors.emailAddress = "";
    }

    setErrors(newErrors);
    return hasAnyError;
  };
  return {
    Account,
    handleChange,
    errors,
    handleFormSubmit,
    handleClear,
    snackbar,
  };
};
