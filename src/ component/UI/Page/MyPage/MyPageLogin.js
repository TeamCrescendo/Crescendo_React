import React from 'react';
import LoginButton from "../../button/login/original_login/Login_Button";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";

const MyPageLogin = ({ isLogin, LoginSessionCheck }) => {
    return (
        <div>
            <Login_modal_Button isLogin={isLogin} LoginSessionCheck={LoginSessionCheck}/>
            <p>개인서비스를 이용하시려면 로그인 해주세요.</p>
        </div>
    );
};

export default MyPageLogin;