import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import "../../App.css"
import SideNav from "./SideNav";
import Navbar from "./Navbar";

const LayoutComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
        <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LayoutComponent;
