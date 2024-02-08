import React, { useState } from 'react';
import './Login_modal_Button.scss';
import LoginModal from '../../modal/login_modal/Login_modal';
import RegisterModal from "../../modal/register_modal/Register_modal";
import Button from "@mui/material/Button";

const Login_modal_Button = ({ isLogin, LoginCheck, googleLogin }) => {
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
            {/*<button >*/}
            {/*    로그인*/}
            {/*</button>*/}
            <Button variant="contained" color="success" className="loginModalOpenBtn" onClick={handleButtonClick}
                    style={{ borderBottomLeftRadius: "100px", borderTopLeftRadius: "100px", fontWeight: "bold", fontSize: "30px"}}>
                Login
            </Button>

            {loginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)}
                                           registerHandler={registerHandler} isLogin={isLogin}
                                           LoginCheck={LoginCheck} googleLogin={googleLogin}/>}
            {registerModalOpen && <RegisterModal onClose={() => setRegisterModalOpen(false)} />}
        </>
    );
};

export default Login_modal_Button;
