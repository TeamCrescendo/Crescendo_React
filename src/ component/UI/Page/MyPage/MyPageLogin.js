import React from 'react';
import LoginButton from "../../button/login/original_login/Login_Button";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import './MyPageLogin.scss';

const MyPageLogin = ({ isLogin, loginCheck }) => {
    return (
        <div className="not-login-container">
            <span className="title">개인서비스를 이용하시려면 로그인 해주세요.</span>
            <Login_modal_Button isLogin={isLogin} loginCheck={loginCheck}/>
        </div>
    );
};

export default MyPageLogin;