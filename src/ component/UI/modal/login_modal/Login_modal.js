import React, { useRef } from 'react';
import { GrClose } from "react-icons/gr";
import './Login_modal.scss';
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";

const LoginModal = ({ onClose, registerHandler }) => {
    const modalBackground = useRef();

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    const loginClose = e => {
        onClose();
    }

    const setRegisterModal = e => {
        registerHandler();
    }


    const pwFindHandler= e => {
        console.log("비밀번호 찾기 클릭됨!");
    }

    return (
        <div className="login-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="login-modal-content">
                <button className="loginModalCloseBtn" onClick={loginClose}>
                    <GrClose />
                </button>
                <div className="login-modal-title">
                    <h2>로그인</h2>
                </div>

                <input type="text" className="input-account" placeholder="아이디" />
                <input type="password" className="input-password" placeholder="패스워드" />

                <div className="autoLoginContainer">
                    <div>
                        <input className="autoLoginCheckBox" type="checkbox" />
                        자동 로그인
                    </div>
                    <span className="pwfindSpan" onClick={pwFindHandler}>비밀번호 찾기</span>
                </div>

                <LoginButton />
                <KakaoLoginButton />
                구글로그인

                <div className="registerContainer">
                    <span>회원이 아니신가요?</span> <span className="registerSpan" onClick={setRegisterModal}>회원가입</span>
                </div>

            </div>
        </div>
    );
};

export default LoginModal;
