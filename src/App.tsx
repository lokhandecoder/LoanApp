import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SideNav from "./Components/Fixed/SideNav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./Routing/PageRoutes";

const theme = createTheme({
  // Your theme configurations
});
function App() {
  return (
    <>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
