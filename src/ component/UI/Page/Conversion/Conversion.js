import React, {useState} from 'react';

import './Conversion.scss';
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";

const Conversion = ({ isForward, LoginHandler, isLogin, loginInfo }) => {


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });



    const renderUserInfo = () => {
        switch (isLogin){
            case true:
                return <UserInfomation loginInfo={loginInfo} />
            default:
                return <Login_modal_Button isLogin={LoginHandler}/>
        }
    }

    return (
        <div className={`conversionContainer ${setAnimation}`}>
            <div className="conversionHeader">
                {renderUserInfo()}
            </div>
            <div className="conversionMain">
                악보변환 페이지
            </div>
        </div>
    );
};

export default Conversion;