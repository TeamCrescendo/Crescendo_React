import React from 'react';

import './MyPage.scss';
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import MyPageLoggedIn from "./MyPage_LoggedIn";
import MyPageLogin from "./MyPageLogin";

const MyPage = ({ isForward, isLogin, loginInfo, logoutHandler, LoginSessionCheck }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    const renderPage = () => {
        if (isLogin && loginInfo != null) {
            return <MyPageLoggedIn loginInfo={loginInfo} logoutHandler={logoutHandler}/>
        } else {
            return <MyPageLogin isLogin={isLogin} LoginSessionCheck={LoginSessionCheck}/>
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