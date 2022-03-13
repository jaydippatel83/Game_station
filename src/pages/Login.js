import React, { Fragment, useEffect, useState } from "react";
import { Web3Context } from "../context/WebContext";
import { useMoralis } from "react-moralis";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const history = new useHistory();

    const webContext = React.useContext(Web3Context);
    const { connectWallet, currentAddress, required, isUpdate } = webContext;
    const { authenticate, isAuthenticated, user, account, login, authError, userError, isAuthenticating, Moralis } = useMoralis();
    const [loading, setLoading] = React.useState(false);
    const [themes, setThemes] = useState('');

    let theme;

    const users = Moralis.Object.extend("User");
    const userPoints = Moralis.Object.extend("UsePointsTable");
    const query = new Moralis.Query(users);
    const userQuery = new Moralis.Query(userPoints);


    useEffect(async () => {
        if (isAuthenticated) {
            history.push('/');
        }
        if (authError) {
            toast.error(authError.message)
        }
        if (userError) {
            toast.error(userError.message)
        }
        theme = localStorage.getItem("theme");
        setThemes(theme);





    }, [isAuthenticated, authError, userError, isUpdate])

    const formik = useFormik({
        initialValues: {
            Username: "",
            Password: "",
        },
        validationSchema: Yup.object({
            Username: Yup.string().required(required),
            Password: Yup.string().min(6, 'Password must be at least 6 characters').required(required),
        }),
        onSubmit: async (values) => {
            try {
                await login(values.Username, values.Password);
                setLoading(!loading);
            } catch (error) {
                console.log("Error: " + error.code + " " + error);
            }
        },
    });
    return (
        <Fragment>
            <ToastContainer />
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/"> 
                             <img  height={100} src="assets/images/logo/gamestation.png" alt="GST" />  
                            {/* <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> */}
                        </a>
                        <button className="nav-menu me-0 ms-auto"></button>

                        <button onClick={() => connectWallet()} className="header-btn btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-auto cursot-pointer text-center lh-20 rounded-xl address-wrap">{currentAddress != null && currentAddress != undefined && currentAddress != '' ? currentAddress : "Connect Wallet"}</button>

                        {/* <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</a> */}
                    </div>
                </div>
                <div className="row">
                    {/* <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/social-network-app-a53f8.appspot.com/o/MicrosoftTeams-image%20(8).png?alt=media&token=49d5dc49-eb88-41a6-945e-823eded89cea")` }}></div> */}
                    <div style={{marginTop:'50px'}} className="col-xl-8 vh-100 theme-dark-bg align-items-center d-flex bg-white rounded-3 overflow-hidden mx-auto">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h4 className="fw-700 display1-size display2-md-size mb-3">Login into <br />your account</h4>

                                <div className="col-sm-12 p-0 text-center mt-2">
                                    <div className="form-group mb-1">
                                        <button onClick={() => authenticate()} style={{ border: '2px solid grey' }}
                                            className="form-control text-left style2-input text-dark fw-600  p-0 mb-2">
                                            <img src="assets/images/fx.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Metamask</button>
                                    </div>
                                </div>

                                <Divider className="my-3"><Chip label="OR" className="h4" /></Divider>

                                <form onSubmit={formik.handleSubmit}>

                                    <div className="form-group icon-input mb-3">
                                        <FontAwesomeIcon style={{ position: 'absolute', top: '20px', left: '20px' }} className="font-sm text-grey-500 pe-0" icon={faAt} />
                                        <input
                                            type="text"
                                            id="Username"
                                            name="Username"
                                            className="h4 style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Username"
                                            {...formik.getFieldProps("Username")}
                                        />
                                        {formik.touched.Username && formik.errors.Username ? (
                                            <div style={{ color: "red", fontWeight: 'bold' }}>{formik.errors.Username}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="Password"
                                            id="Password"
                                            name="Password"
                                            className="h4 style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Password"
                                            {...formik.getFieldProps("Password")}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        {formik.touched.Password && formik.errors.Password ? (
                                            <div style={{ color: "red", fontWeight: 'bold' }}>{formik.errors.Password}</div>
                                        ) : null}
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        {/* <input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                                        <label className="form-check-label font-xsss text-grey-500">Remember me</label> */}
                                        <a href="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right h4">Reset your Password?</a>
                                    </div>
                                    <div className="col-sm-12 p-0 text-left">

                                        <LoadingButton
                                            color="secondary"
                                            loading={isAuthenticating}
                                            loadingPosition="start"
                                            startIcon={<SaveIcon />}
                                            className="form-control text-center style2-input text-white fw-600 bg-primary border-0 p-0 "
                                            variant="contained"
                                            type="submit"
                                        >
                                            Login
                                        </LoadingButton>

                                        {/* <button
                                            type="submit"
                                            className="form-control text-center style2-input text-white fw-600 bg-primary border-0 p-0 "
                                        >
                                            Login
                                        </button> */}
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Don't have account?<a href="/auth" className="fw-700 ms-1">Register</a></h6>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );

}

export default Login;