import React, { Component , Fragment } from "react";
import Header from '../components/Header';  
import Appfooter from '../components/Appfooter';  
import ProfilecardThree from '../components/ProfilecardThree';
 

class Userpage extends Component {
    render() {
        return (
            <Fragment> 
                <Header />  

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12 mb-3">
                                    <ProfilecardThree />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div> 
                <Appfooter /> 

            </Fragment>
        );
    }
}

export default Userpage;