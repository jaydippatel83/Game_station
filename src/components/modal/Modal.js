import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useMoralis, useChain, useNewMoralisObject, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import { ToastContainer, toast } from 'react-toastify';
import { tokenAddres, marketAddress } from '../../config';

import TokenAbi from '../../abi/Token.json';
import MarketAbi from '../../abi/Market.json';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import web3 from "web3";
//  import {NFTStorage} from 'nft.storage';
const apiKey = process.env.FILE_COIN_API_KEY;


// const client = new NFTStorage({ token: apiKey })


export default function CreatePostModal() {
    const { user, Moralis, web3EnableError, } = useMoralis();
    const { saveFile, moralisFile } = useMoralisFile();
    const { isSaving, save, error } = useNewMoralisObject("UserPosts");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [avatar, setAvatar] = useState(null);
    const [discription, setdiscription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [userId, setUserId] = useState("");
    const [isUpdated, setIsupdated] = useState(false);

    // const ipfsProcessor = useMoralisFile();
    const contractProcessor = useWeb3ExecuteFunction();

    const userPoints = Moralis.Object.extend("UsePointsTable");
    const userQuery = new Moralis.Query(userPoints);


    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
        if (web3EnableError) {
            toast.error(web3EnableError.message);
        }

    }, [isUpdated,isSaving])

    async function onChangeAvatar(e) {
        const file = e.target.files[0];
        let fileIpfs = await saveFile(user.attributes.username, file, { saveIPFS: true });
        setAvatar(fileIpfs._ipfs);
    }

    async function publishPost() {
        if (!discription) {
            alert("This field is require!")
            return;
        }
        const saveData = {
            title: title,
            discription : discription,
            postImage: avatar,
            price: price,
        }

        await save({ saveData, user });

        if (user) {
            userQuery.equalTo("user", user.id);
            const usrpoint = await userQuery.first();
            if (usrpoint.attributes.CreatePostPoint != undefined && usrpoint.attributes.CreatePostPoint != null) {
                usrpoint.set("CreatePostPoint", 5 + usrpoint.attributes.CreatePostPoint);
            } else {
                usrpoint.set("CreatePostPoint", 5);
            }
            usrpoint.set("user", user.id);
            await usrpoint.save();
            setIsupdated(!isUpdated);
        }
        setShow(false);
        toast.success("success post");
    }

    async function mintPublishPost() {
        if (!discription) {
            toast.error("All the fields are require!");
            return;
        } 
        const  data = {
            title: title,
            discription : discription,
            postImage: avatar,
            price: price,
        }

        const file = new Moralis.File("data.json", { base64: btoa(JSON.stringify(data)) });
        const dataUri = await file.saveIPFS();
        const uri = dataUri._ipfs;
        console.log(uri,"uri");
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();


    let contract = new ethers.Contract(tokenAddres, TokenAbi.abi, signer); 
    let transaction = await contract.createToken(uri); 
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber(); 
    const pr = web3.utils.toWei(price, "ether");  
    const listingPrice = web3.utils.toWei("0.1", "ether"); 
   await  contract.approve(marketAddress,tokenId); 
    contract = new ethers.Contract(marketAddress, MarketAbi.abi, signer);  
    transaction = await contract.createMarketItem(tokenAddres, tokenId, pr, {
      value: listingPrice,
    });

    

    await transaction.wait();  

        const saveData = { 
            postImage: avatar, 
            uri: uri,
            tokenId: tokenId,
            address: user.attributes.ethAddress, 
            title: title,
            discription : discription, 
            price: price,
        }
        await save({ saveData, user }); 
      
        setIsupdated(!isUpdated);
        toast.success("Successfully Mint Your NFT!!")
        setShow(false); 
    }

    useEffect(()=>{

    },[isUpdated]);

    return (
        <div>
            <ToastContainer />
            <button style={{border:'none'}} className="p-2 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded border-none" variant="primary" onClick={() => setShow(true)}>
                Create Post
            </button>

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header className='card' closeButton>
                    <Modal.Title className='h4'>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card'>
                <div className="form-group icon-input ">
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            className=" h4 bor-0 w-100 rounded-xxl p-2 ps-3 font-xssss text-grey-900 fw-500 border-light-md theme-dark-bg"
                            placeholder="Enter Title"
                        />
                    </div>
                    <div className="card-body p-0 mt-3 position-relative">
                        <figure className="avatar position-absolute ms-2 mt-1 top-5"><img src={"assets/images/user.png"} alt="icon" className="shadow-sm rounded-circle w30" /></figure>
                        <textarea onChange={(e) => setdiscription(e.target.value)} name="message" className="h20 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="20" rows="4" placeholder="Share Details"></textarea>
                    </div>
                    <div className="flex items-center gap-3"> 
                       
                        <input type="file" name="file" id="file" className="input-file" onChange={onChangeAvatar} />
                        <label
                            htmlFor="file"
                            className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-20 border-dashed img-upload"
                        >
                            <i className="ti-cloud-up large-icon me-3 d-block"></i>
                            <span className="js-fileName">
                                Upload Image(PNG, JPG, GIF, MP4.)
                            </span>
                        </label>
                    </div> 
                
                    <div className="form-group icon-input ">
                        <input
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            className=" h4 bor-0 w-100 rounded-xxl p-2 ps-3 font-xssss text-grey-900 fw-500 border-light-md theme-dark-bg"
                            placeholder="Enter Price in MATIC"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className='card d-flex justify-content-center'>
                    <button style={{border:'none',}} className="p-2  bg-primary-gradiant  me-2 text-white text-center font-xssss fw-600 ls-1 rounded border-none" onClick={publishPost}>
                        Publish
                    </button>
                    <button style={{border:'none',}} className="p-2  bg-primary-gradiant  me-2 text-white text-center font-xssss fw-600 ls-1 rounded border-none" onClick={mintPublishPost}>
                        Mint & Publish
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
