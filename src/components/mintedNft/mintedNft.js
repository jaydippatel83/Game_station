import axios from "axios";
import { ethers } from "ethers";
import React, { Fragment, useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import Web3 from "web3";
import { marketAddress, tokenAddres } from "../../config";
import Appfooter from "../Appfooter";
import Header from "../Header";
import SkeletonCard from "../skeleton/Card";
import Web3Modal from "web3modal";
import MarketAbi from "../../abi/Market.json";
import { toast } from "react-toastify";

function MintedNft() {
  const { Moralis } = useMoralis();
  const [tokenid, setTokenid] = useState([]);
  const [uriData, setUriData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isUpdated, setIsupdated] = useState(false);
  const { data, error, isLoading } = useMoralisCloudFunction("getAllPost");
  const NftData = Moralis.Object.extend("UserPosts");
   const nftData = new NftData();   


  async function getMintedNft() {
    const fetchNft = JSON.parse(JSON.stringify(data));
    setMeta(fetchNft);
  }

  

  useEffect(() => {
    getMintedNft();
  }, [data, isLoading]);

  useEffect(async () => {}, [data, meta]); 

  const buyNft = async(nft) =>{  
      console.log(nft,"nft");
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketAddress,
        MarketAbi.abi,
        signer
      );
      console.log(nft.price,"price");
 
      const price = ethers.utils.parseUnits(nft.price, "ether");
      console.log(price);
      const listingPrice = Web3.utils.toWei("0.1", "ether"); 
      console.log(price);
      const transaction = await contract.createMarketSale(
        tokenAddres,
        nft.tokenId, 
         {
             value : price
         }
      );

      await transaction.wait();
       
      toast.success("Successfully Buy Item!!!");
      nftData.unset("")
      getMintedNft()
    } catch (error) {
      console.log("err", error);
      toast.error("Something Went wrong!!!");
    }
  }
  return (
    <Fragment>
      <Header />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="container">
            <div className="card  shadow-xss rounded-xxl border-0 p-4 mb-3">
              <div className="row my-3">
                <h1>Minted NFTs Collection</h1>
              </div>
              <div className="row justify-around">
                {/* <div className='col-xl-12'> */}

                {meta != null ? (
                  meta.map((e, i) => { 
                    return (
                      <div
                        key={meta[i].objectId}
                        className="col-lg-4 col-sm-6  "
                      >
                        <div className=" card-body theme-dark-bg  shadow-xss rounded-xxl border-0 p-3 mb-3 ">
                          <div className=" p-0 d-flex">
                            <h4
                              style={{
                                textOverflow: "ellipsis",
                                width: "150px",
                                overflow: "eclipcis",
                              }}
                              className="fw-700 text-grey-900 font-xssss mt-1 text-nowrap"
                            >
                              {" "}
                              Seller : {meta[i].user.username}
                            </h4>
                          </div>
                          <div className="card-body p-0 ">
                            <h4 className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-800">
                              Title : {meta[i].saveData.title}
                            </h4>
                            <p className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                              Discription : {meta[i].saveData.discription}
                            </p>
                            <p className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                              price : {meta[i].saveData.price}
                            </p>
                          </div>
                          {meta[i].saveData.postImage != null ? (
                            <div className="card-body d-block p-0 mb-3">
                              <div className="row ps-2 pe-2">
                                <div className="col-sm-12 p-1">
                                  <img
                                    width="100%"
                                    height="300"
                                    src={`${meta[i].saveData.postImage}`}
                                    className="rounded-3 "
                                    alt="post"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="card-body p-0 ">
                            <button
                              onClick={()=>buyNft(meta[i].saveData)}
                              style={{ border: "none" }}
                              className="p-2 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded border-none"
                              variant="primary"
                            >
                              Buy Nft
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <SkeletonCard />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Appfooter />
    </Fragment>
  );
}

export default MintedNft;
