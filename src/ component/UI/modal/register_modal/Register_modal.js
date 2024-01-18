import React, {useRef, useState} from 'react';

import './Register_modal.scss';
import {GrClose} from "react-icons/gr";
import { FiAlertCircle } from "react-icons/fi";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import RegisterButton from "../../button/register/Register_Button";

const RegisterModal = ({ onClose }) => {
    const modalBackground = useRef();
    const [account, setAccount] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    const registerClose = e => {
        onClose();
    }

    const registerSubmit = e => {
        e.preventDefault();

        if (password !== password2) {
            return;
        }

        fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account,
                nickname: nickname,
                email: email,
                password: password
            }),
        })
            .then(res => res.json())
            .then(json => {
                // 로그인 검증 메서드
                console.log("회원가입 성공여부: ", json)
            })
    }

    return (
        <div className="register-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <form className="register-modal-content" onSubmit={registerSubmit}>
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
                        <input
                            type="text"
                            className="input-account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                        <div className="exDiv">
                            <span className="red">*</span><span>닉네임 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="text"
                            className="input-nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <div className="exDiv">
                            <span className="red">*</span><span>이메일 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="email"
                            className="input-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="password"
                            className="input-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호 확인</span>
                        </div>
                        <input
                            type="password"
                            className="input-password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="register-profile-img-container">
                        <img className="imgtest" src="img/default_profile.png" alt="기본 프로필" />

                        <div className="img-title">
                            기본 프로필
                        </div>

                        <RegisterButton />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterModal;