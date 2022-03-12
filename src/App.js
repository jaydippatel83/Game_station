import React from "react";

import Authenticate from "./pages/Authenticate";
import { MoralisProvider } from "react-moralis"; 
import ReactDOM from "react-dom";

import "./main.scss";
import "./index.css";
import "react-toastify/dist/ReactToastify.css"; 

import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot"; 
 
import Userpage from "./pages/Userpage"; 

import { Web3ContextProvider } from "./context/WebContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Appfooter from "./components/Appfooter"; 
import MintedNft from "./components/mintedNft/mintedNft";
 

function App() {
  return (
    <Web3ContextProvider>
      <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_ID}
        serverUrl={process.env.REACT_APP_MORALIS_SERVER}
      >
        <BrowserRouter basename={"/"}>
          <Switch> 
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/auth`}
              component={Authenticate}
            /> 

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={Register}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgot`}
              component={Forgot}
            />
         
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/userpage`}
              component={Userpage}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/mintedNft`}
              component={MintedNft}
            />
          </Switch> 
        </BrowserRouter>
      </MoralisProvider>
    </Web3ContextProvider>
  );
}

export default App;
