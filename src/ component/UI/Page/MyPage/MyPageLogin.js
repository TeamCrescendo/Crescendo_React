import React from 'react';
import LoginButton from "../../button/login/original_login/Login_Button";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import './MyPageLogin.scss';

const MyPageLogin = ({ isLogin, loginCheck, googleLogin }) => {
    return (
        <div className="not-login-container">
            <div className="not-login-header">
                <Login_modal_Button isLogin={isLogin} loginCheck={loginCheck} googleLogin={googleLogin}/>
            </div>
            <span className="title">개인서비스를 이용하시려면 로그인 해주세요.</span>
        </div>
    );
};

export default MyPageLogin;