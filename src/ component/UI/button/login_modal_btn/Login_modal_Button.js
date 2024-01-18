import React, { useState } from 'react';
import './Login_modal_Button.scss';
import LoginModal from '../../modal/login_modal/Login_modal';
import RegisterModal from "../../modal/register_modal/Register_modal";

const Login_modal_Button = ({ isLogin }) => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    const handleButtonClick = () => {
        setLoginModalOpen(true);
    };


    const registerHandler = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
        console.log("회원가입 눌림!");
    }

    return (
        <>
            <button className="loginModalOpenBtn" type="button" onClick={handleButtonClick}>
                로그인
            </button>

            {loginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)}
                                           registerHandler={registerHandler} isLogin={isLogin}/>}
            {registerModalOpen && <RegisterModal onClose={() => setRegisterModalOpen(false)} />}
        </>
    );
};

export default Login_modal_Button;
