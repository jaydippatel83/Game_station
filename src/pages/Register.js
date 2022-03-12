import React, { Component, Fragment, useState, useContext, useEffect } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Web3Context } from "../context/WebContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMoralis, useMoralisFile } from "react-moralis";


function Register() {
    const webContext = React.useContext(Web3Context);
    const { connectWallet, currentAddress, required, isUpdate } = webContext;


    const { saveFile, moralisFile } = useMoralisFile();
    const { user, setUserData } = useMoralis();
    const [avatarw, setAvatar] = useState(null);
    const [coverw, setCover] = useState(null);
    const [themes, setThemes] = useState('');

    let theme;

   


    useEffect(() => {
        theme = localStorage.getItem("theme");
        setThemes(theme);
    }, [isUpdate]);


    async function onChangeCover(e) {
        const file = e.target.files[0];
        let fileIpfs = await saveFile("social", file, { saveIPFS: true });
        user.set("coverPhoto", fileIpfs);
        await user.save();
        setCover(user.attributes.coverPhoto._url);
       
    }

    async function onChangeAvatar(e) {
        const file = e.target.files[0];
        let fileIpfs = await saveFile("social", file, { saveIPFS: true });
        user.set("profilePic", fileIpfs);
        await user.save();
        setAvatar(user.attributes.profilePic._url);
       
    }

    const formik = useFormik({
        initialValues: {
            // avatar: "",
            // cover: "",
            username: "",
            bio: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(required),
            bio: Yup.string().required(required),
            // avatar: Yup.mixed().required(required),
            // cover: Yup.mixed().required(required),
        }),
        onSubmit: async (values) => {
             
            if (user) {
                await setUserData({
                    username: values.username,
                    Avatar: avatarw,
                    cover: coverw,
                    bio: values.bio,
                }
                );

            }
        },
    });



    return (
        <Fragment>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/">
                            {/* <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. 
                            </span>  */}

                            {
                                themes == 'theme-light' ? <img  width={300} src="assets/images/logo/logo11.png" alt="SFS" /> : <img  width={300} src="assets/images/logo/logo12.png" alt="SFS" />
                            }

                        </a>
                        <button className="nav-menu me-0 ms-auto"></button>

                        <button onClick={() => connectWallet()} className="header-btn btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-auto cursot-pointer text-center lh-20 rounded-xl address-wrap">{currentAddress != null && currentAddress != undefined && currentAddress != '' ? currentAddress : "Connect Wallet"}</button>
                        {/* <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Connect Wallet</a> */}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("http://sociala.uitheme.net/assets/images/login-bg-2.jpg")` }}></div>
                    <div style={{marginTop:'50px'}} className="col-xl-7 theme-dark-bg vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div  className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">Create Profile</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="space-y-1.5 mb-3">
                                        <label>Avatar</label>
                                        <div className="flex items-center gap-3">
                                            <img
                                                alt=""
                                                className="rounded-circle h-24 w-24"
                                                src={
                                                    avatarw == null
                                                        ? "https://via.placeholder.com/800x950.png"
                                                        : avatarw
                                                }
                                                width="100"
                                                height="100"
                                            />
                                            <label
                                                htmlFor="avatar"
                                                id="get_file"
                                                name="Asset"
                                                className="btn-main "
                                                style={{
                                                    color: "black",
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    left: "40px",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <AddPhotoAlternateIcon
                                                    style={{ fontSize: "60px", opacity: "0" }}
                                                />
                                            </label>
                                            <input
                                                id="avatar"
                                                onChange={onChangeAvatar}
                                                style={{ display: "none" }}
                                                type="file"
                                            // {...formik.getFieldProps("avatar")}
                                            />
                                            {/* {formik.touched.avatar && formik.errors.avatar ? (
                                                <div style={{ color: "red" }}>{formik.errors.avatar}</div>
                                            ) : null} */}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 mb-3">
                                        <label>Cover</label>
                                        <div className="space-y-3">
                                            <input type="file"
                                                id="cover"
                                                onChange={onChangeCover}
                                                name="file" id="file"
                                                className="input-file"
                                            // {...formik.getFieldProps("cover")} 
                                            />
                                            <label
                                                htmlFor="file"
                                                className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed img-upload"
                                            >
                                                <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                                <span className="js-fileName">
                                                    Drag and drop or click to replace
                                                </span>
                                            </label>
                                            {/* {formik.touched.cover && formik.errors.cover ? (
                                                <div style={{ color: "red" }}>{formik.errors.cover}</div>
                                            ) : null} */}
                                        </div>
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        {/*---------------------  Your nameeee  */}{" "}
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Username"
                                            {...formik.getFieldProps("username")}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div style={{ color: "red" }}>{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            id="bio"
                                            type="text"
                                            name="bio"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Bio"
                                            {...formik.getFieldProps("bio")}
                                        />
                                        {formik.touched.bio && formik.errors.bio ? (
                                            <div style={{ color: "red" }}>{formik.errors.bio}</div>
                                        ) : null}
                                    </div>
                                    <button
                                        type="submit"
                                        className="form-control text-center style2-input text-white fw-600 bg-primary border-0 p-0 "
                                    >
                                        Register
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );

}

export default Register;

