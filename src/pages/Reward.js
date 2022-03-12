import React, { Fragment } from 'react';
import Appfooter from '../components/Appfooter';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Popupchat from '../components/Popupchat';
import ProfilecardThree from '../components/ProfilecardThree';
import Rewards from '../components/reward/rewards';
import Rightchat from '../components/Rightchat';

function Reward() {
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <Rightchat />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <Rewards />
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />

        </Fragment>
    );
}

export default Reward;
