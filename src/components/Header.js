import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CreatePostModal from "../components/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

import {
  faBolt,
  faCoins,
  faStar,
  faTrophy,
  faBriefcase,
  faAward,
  faStore
} from "@fortawesome/free-solid-svg-icons";
import { useMoralis } from "react-moralis";
import UserProfileModal from "../components/modal/UserProfileModal";
import { Web3Context } from '../context/WebContext'; 
 

function Header() {
  const history = new useHistory();
  const webContext = React.useContext(Web3Context);
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [isNoti, setIsNoti] = React.useState(false);
  const { account, isAuthenticated, logout, user } = useMoralis();
  const [themes, setThemes] = useState("");

  const { isUpdate } = webContext;

  let theme;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    theme = localStorage.getItem("theme");
    setThemes(theme);
  }, [isAuthenticated, isUpdate]);

  const handleClick = () => {
    setOpen(!open);
  };
  const toggleOpen = () => {
    setIsOpen(true);
  };
  const toggleActive = () => {
    setActive(true);
  };
  const toggleisNoti = () => {
    setIsNoti(true);
  }; 
   
  function navigatePages(path) { 
    history.push(path);
  }; 
 
  const navClass = `${isOpen ? " nav-active" : ""}`;
  const buttonClass = `${isOpen ? " active" : ""}`;
  const searchClass = `${active ? " show" : ""}`;
  const notiClass = `${isNoti ? " show" : ""}`;

  return (
    <div className="nav-header bg-white shadow-xs border-0">
      <div className="nav-top">
        <Link to="/">
          
            <img 
height={100}
              src="assets/images/logo/gamestation.png"
              alt="GST"
            /> 
          {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                    <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                        Sociala. </span> */}
        </Link>

        <Link
          to="/defaultmessage"
          className="mob-menu ms-auto me-2 chat-active-btn"
        >
          <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
        </Link>
        <Link to="/defaultvideo" className="mob-menu me-2">
          <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
        </Link>
        <span onClick={toggleActive} className="me-2 menu-search-icon mob-menu">
          <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
        </span>
        <button
          onClick={toggleOpen}
          className={`nav-menu me-0 ms-2 ${buttonClass}`}
        ></button>
      </div>

      <div className="ms-auto ml-auto">
        <NavLink
          activeClassName=""
          to="/"
          className="p-2 text-center ms-3 menu-icon center-menu-icon"
        >
          <i className="feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i>
        </NavLink> 
      </div>
     
      <CreatePostModal />

      {/* <Link to="/defaultsettings" className="p-0 ms-3 menu-icon"><img src="assets/images/user.png" alt="user" className="w40 mt--1 rounded-circle" /></Link> */}
      <UserProfileModal />
      <nav className={`navigation scroll-bar ${navClass}`}>
        <div className="container ps-0 pe-0">
          <div className="nav-content">
            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
              {/* <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div> */}
              <ul className="mb-1 top-content">
                <li className="logo d-none d-xl-block d-lg-block"></li>
                <List
                  sx={{ width: "100%", maxWidth: 360 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={() => navigatePages("/playandearn")}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        style={{
                          padding: "12px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="btn-round-md bg-primary-gradiant text-white"
                        icon={faCoins}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="fw-700  h4"
                      primary="Game Posts"
                    />
                  </ListItemButton>
                  <ListItemButton onClick={() => navigatePages("/luckylottery")}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        style={{
                          padding: "12px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="btn-round-md bg-red-gradiant text-white"
                        icon={faStar}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="fw-700  h4"
                      primary="Game play NFTs"
                    />
                  </ListItemButton>
 
                  
                  <ListItemButton onClick={() => navigatePages("/mintedNft")}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        style={{
                          padding: "12px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="btn-round-md bg-primary-gradiant text-white"
                        icon={faStore}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="fw-700  h4"
                      primary="Asset Maketplace"
                    />
                  </ListItemButton> 
               
                </List> 
                </ul>
                </div>
          </div>
        </div>
      </nav>

      <div className={`app-header-search ${searchClass}`}>
        <form className="search-form">
          <div className="form-group searchbox mb-0 border-0 p-1">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
            />
            <i className="input-icon">
              <ion-icon
                name="search-outline"
                role="img"
                className="md hydrated"
                aria-label="search outline"
              ></ion-icon>
            </i>
            <span className="ms-1 mt-1 d-inline-block close searchbox-close">
              <i className="ti-close font-xs" onClick={toggleActive}></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Header;
