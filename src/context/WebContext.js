import { ethers } from "ethers";
import React, { useState, createContext, useEffect } from "react";
import { useMoralisCloudFunction } from "react-moralis";
import Web3 from "web3";
import {tokenAddres} from '../config';


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


  // async function loadNFTs() {
  //   const { data, error, isLoading } = useMoralisCloudFunction("getAllPost"); 
  //   setLoadingState(false);
  //   let web3 = new Web3();
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const tokenContract = new ethers.Contract( nftA, NFT.abi, provider);
  //   const marketContract = new ethers.Contract(
  //     nftmarketaddress,
  //     Market.abi,
  //     provider
  //   );
  //   const data = await marketContract.fetchMarketItems();
  //   const items = await Promise.all(
  //     data.map(async (i) => {
  //       const tokenUri = await tokenContract.tokenURI(i.tokenId);
  //       const meta = await axios.get(tokenUri);
  //       let price = web3.utils.fromWei(i.price.toString(), "ether");

  //       let item = {
  //         price,
  //         tokenId: i.tokenId.toNumber(),
  //         name: meta.data.name,
  //         description: meta.data.description,
  //         seller: i.seller,
  //         owner: i.owner,
  //         image: meta.data.image,
  //         category: meta.data.category,
  //         nftType: meta.data.nftType,
  //       };
  //       return item;
  //     })
  //   );
  //   console.log(items, "its me");
  //   setNfts(items);
  //   setLoadingState(true);
  // }



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
