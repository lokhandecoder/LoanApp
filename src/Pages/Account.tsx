import React from "react";
import SideNav from "../Components/Fixed/SideNav";
import Box from "@mui/material/Box";
import Navbar from "../Components/Fixed/Navbar";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import AccountForm from "../Components/Account/AccountForm";
function Account() {

  return (
    <>
      <LayoutComponent>
        <AccountForm   /> 
      </LayoutComponent>
    </>
  );
}

export default Account;
