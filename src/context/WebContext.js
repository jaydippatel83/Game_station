import React, { useState, createContext, useEffect } from "react";
import Web3 from "web3";


export const Web3Context = createContext(undefined);

export const Web3ContextProvider = (props) => {

  const [currentAddress, setCurrentAddress] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  let clickedClass = "clicked"
  const body = document.body
  const lightTheme = "theme-light"
  const darkTheme = "theme-dark"
  let theme

  if (localStorage) {
    theme = localStorage.getItem("theme")
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  useEffect(() => {
    console.log(currentAddress, "current Address"); 
  }, [currentAddress]);


  //connect wallet
  async function connectWallet() {
    let web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function (accounts) {
          setCurrentAddress(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          window.ethereum.on("accountsChanged", function (accounts) {
            setCurrentAddress(accounts[0]);
            localStorage.setItem("account", accounts[0]);
          });
        });
      } catch (e) {
        alert("User rejected the MetaMask connection request !");
        localStorage.setItem("account", null);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("You have to install MetaMask!");
    }
  }

  const required = "This field is required!";

  //authentication with metamask 

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      e.target.classList.remove(clickedClass)
      localStorage.setItem("theme", "theme-light")
      setIsUpdate(!isUpdate);
      theme = lightTheme
    } else {
      body.classList.replace(lightTheme, darkTheme)
      e.target.classList.add(clickedClass)
      localStorage.setItem("theme", "theme-dark")
      setIsUpdate(!isUpdate);
      theme = darkTheme
    }
  }



  return (
    <Web3Context.Provider
      value={{
        currentAddress,
        connectWallet,
        theme,
        switchTheme,
        clickedClass,
        required,
        isUpdate,
      }}
      {...props}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
