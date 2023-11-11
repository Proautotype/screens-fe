import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Outlet} from 'react-router-dom'
import {routerPaths} from "./router.config";
import {Button} from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>

          <Link to={routerPaths.signin}>Sign-In</Link>
        </Button>
      </header>
    </div>
  );
}

export default App;
