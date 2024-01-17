import React, {useRef} from 'react';

import './Register_modal.scss';
import {GrClose} from "react-icons/gr";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";

const RegisterModal = ({ onClose }) => {
    const modalBackground = useRef();
    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    const registerClose = e => {
        onClose();
    }

    return (
        <div className="login-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="login-modal-content">
                <button className="loginModalCloseBtn" onClick={registerClose}>
                    <GrClose />
                </button>
                <div className="login-modal-title">
                    <h2>회원가입</h2>
                </div>

                <input type="text" className="input-account" placeholder="아이디" />
                <input type="password" className="input-password" placeholder="패스워드" />


            </div>
        </div>
    );
};

export default RegisterModal;