import React, { Component, Fragment, useEffect, useState } from "react";
import Header from '../components/Header';  
import Appfooter from '../components/Appfooter'; 
import { useLocation } from "react-router-dom";
import moment from 'moment'
import { useMoralis, useMoralisFile } from "react-moralis";


function Chat() {
    const location = useLocation();
    const { Moralis, user } = useMoralis();
    const [userMsg, setUserMsg] = useState()
    const [currentUserMsg, setCurrentUserMsg] = useState()
    const [message, setMessages] = React.useState('');
    const [isUpdated, setIsUpdated] = useState(false);


    const Message = Moralis.Object.extend("Messages");
    const query = new Moralis.Query(Message);

    const msg = new Message();

    useEffect(async () => { 
        query.equalTo("reciever", location.state.id);
        query.descending("createdAt");
        const dd = await query.find(); 
        const getMsg = JSON.parse(JSON.stringify(dd));
        setUserMsg(getMsg);
    }, [location]);

    useEffect(async () => {
        const sender = query.equalTo("sender", user.id);
        const rec = query.equalTo("reciever", location.state.id);
        const mainQuery = Moralis.Query.or(sender, rec);
        const dd = await mainQuery.find(); 
        const getMsg = JSON.parse(JSON.stringify(dd));
        setCurrentUserMsg(getMsg);
    }, [isUpdated]);


    const handleSubmit = async () => { 
        msg.set("message", message);
        msg.set("sender", user.id);
        msg.set("reciever", location.state.id);
        await msg.save();
        setIsUpdated(!isUpdated);
        setMessages('') 
    }

    return (
        <Fragment>
            <Header />  

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                        <div className="row">
                            <div className="col-lg-12 position-relative">
                                <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                    <div className="chat-body p-3 ">
                                        <div className="messages-content pb-5">
                                            {
                                                userMsg && userMsg.map((e, i) => {
                                                   
                                                    return (
                                                        <div key={i} className="message-item  incoming-message">
                                                            <div className="message-user">
                                                                <figure className="avatar">
                                                                    <img src="assets/images/user.png" alt="avater" />
                                                                </figure>
                                                                <div>
                                                                    <h5>{e.sender}</h5>
                                                                    <div className="time"> {moment(e.createdAt).format("MMM Do YY")}</div>
                                                                </div>
                                                            </div>
                                                            <div className="message-wrap">{e.message}</div>
                                                        </div>
                                                    );
                                                })
                                            }

                                            {
                                                currentUserMsg && currentUserMsg.map((e, i) => {
                                                    return (

                                                        <div key={i} className="message-item outgoing-message">
                                                            <div className="message-user">
                                                                <figure className="avatar">
                                                                    <img src="assets/images/user.png" alt="avater" />
                                                                </figure>
                                                                <div>
                                                                    <h5>{e.reciever}</h5>
                                                                    <div className="time"> {moment(e.createdAt).format("MMM Do YY")}</div>
                                                                </div>
                                                            </div>
                                                            <div className="message-wrap">{e.message}</div>
                                                        </div>
                                                    );
                                                })
                                            }


                                        </div>
                                    </div>
                                </div>
                                <div className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg" style={{ width: "98%" }}>
                                    <div className="chat-form d-flex justify-content-around align-self-center">

                                        <input className="bg-grey border-0  pt-2 pb-2  font-xssss fw-500  rounded-xl card h4" onChange={(e) => setMessages(e.target.value)} type="text" placeholder="Start typing.." />

                                        <button onClick={handleSubmit} className="bg-current"><i className="ti-arrow-right text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <Appfooter />

        </Fragment>
    );
}

export default Chat;