import React from "react";
import SideNav from "../Components/Fixed/SideNav";
import Box from "@mui/material/Box";
import Navbar from "../Components/Fixed/Navbar";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import CreateAccountForm from "../Components/CreateAccount/CreateAccountForm";
function CreateAccount() {
  return (
    <>
      <LayoutComponent>
        <h1>Create Account</h1>
        <CreateAccountForm />
      </LayoutComponent>
    </>
  );
}

export default CreateAccount;
