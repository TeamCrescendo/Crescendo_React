import React, {useRef} from 'react';

import './Register_modal.scss';
import {GrClose} from "react-icons/gr";
import { FiAlertCircle } from "react-icons/fi";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import RegisterButton from "../../button/register/Register_Button";

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
        <div className="register-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="register-modal-content">
                <button className="registerModalCloseBtn" onClick={registerClose}>
                    <GrClose />
                </button>
                <div className="register-modal-title">
                    <h2>크레센도 회원가입</h2>
                </div>

                <div className="register-div">
                    <div className="register-input-container">
                        <div className="exDiv">
                            <span className="red">*</span><span>아이디 <FiAlertCircle /></span>
                        </div>
                        <input type="text" className="input-account" />
                        <div className="exDiv">
                            <span className="red">*</span><span>닉네임 <FiAlertCircle /></span>
                        </div>
                        <input type="text" className="input-nickname" />
                        <div className="exDiv">
                            <span className="red">*</span><span>이메일 <FiAlertCircle /></span>
                        </div>
                        <input type="email" className="input-email" />
                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호 <FiAlertCircle /></span>
                        </div>
                        <input type="password" className="input-password" />
                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호 확인</span>
                        </div>
                        <input type="password" className="input-password2" />
                    </div>
                    <div className="register-profile-img-container">
                        <img className="imgtest" src="img/default_profile.png" alt="기본 프로필" />

                        <div className="img-title">
                            기본 프로필
                        </div>

                        <RegisterButton />
                    </div>
                </div>



            </div>
        </div>
    );
};

export default RegisterModal;