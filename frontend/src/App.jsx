//import { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
//import Button from '@mui/material/Button'
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <Navbar> </Navbar>
      <Container
        maxwidth={false}
        sx={{ backgroundColor: "orange", flexGrow: 1 }}
        id="cont"
      >
        My container
      </Container>
    </>
  );
}

export default App;
