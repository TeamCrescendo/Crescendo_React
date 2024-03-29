import React, {useState, useEffect} from 'react';
import './MyPage.scss';
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import MyPageLoggedIn from "./MyPage_LoggedIn";
import MyPageLogin from "./MyPageLogin";

const MyPage = ({ isForward, isLogin, loginInfo, logoutHandler, loginCheck, googleLogin, pageGetter, clickPageGetter }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    const renderPage = () => {
        if (loginInfo != null) {
            return <MyPageLoggedIn loginInfo={loginInfo} logoutHandler={logoutHandler} loginCheck={loginCheck} pageGetter={pageGetter} clickPageGetter={clickPageGetter}/>
        } else {
            return (
                    <MyPageLogin isLogin={isLogin} loginCheck={loginCheck} googleLogin={googleLogin}/>
            )
        }
    }

    return (
        <>
            <div className={`mypageContainer ${setAnimation}`}>
                {renderPage()}
            </div>
        </>
    );
};

export default MyPage;