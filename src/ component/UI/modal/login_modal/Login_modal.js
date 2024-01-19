import React, {useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import './Login_modal.scss';
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import Session from "react-session-api/src";

const LoginModal = ({onClose, registerHandler, isLogin, LoginSessionCheck}) => {
    const modalBackground = useRef();
    // 상태변수 관리
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const URL = "http://localhost:8484/api/auth";

    // 모달 바깥의 백그라운드를 클릭하면 모달이 사라짐
    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    // X 버튼을 눌러도 모달이 사라짐
    const loginClose = e => {
        onClose();
    }
    // 회원가입을 선택하면 회원가입 모달이 나타남
    const setRegisterModal = e => {
        registerHandler();
    }

    // 패스워드 찾기 모달을 생성함
    const pwFindHandler = e => {
        console.log("비밀번호 찾기 클릭됨!");
    }

    // 로그인 버튼을 눌렀을 때
    const loginSubmit = e => {
        e.preventDefault();

        fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account,
                password: password,
                autoLogin: autoLogin
            }),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === true) {
                    isLogin = true;
                    console.log(json)
                } else {
                    isLogin(false);
                }
                // console.log("로그인 유저 정보: ", json.dto);
                console.log("여기까지왔다");
                // LoginSessionCheck();
                window.location.reload();
            })

    }

    return (
        <div className="login-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="login-modal-content">
                <button className="loginModalCloseBtn" onClick={loginClose}>
                    <GrClose/>
                </button>
                <div className="login-modal-title">
                    <h2>로그인</h2>
                </div>

                <form className="login-input-form" onSubmit={loginSubmit}>
                    <input
                        type="text"
                        className="input-account"
                        placeholder="아이디"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-password"
                        placeholder="패스워드"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="autoLoginContainer">
                        <div>
                            <input
                                className="autoLoginCheckBox"
                                type="checkbox"
                                checked={autoLogin}
                                onChange={() => setAutoLogin(!autoLogin)}
                            />
                            자동 로그인
                        </div>
                        <span className="pwfindSpan" onClick={pwFindHandler}>비밀번호 찾기</span>
                    </div>
                    <LoginButton/>
                </form>

                <KakaoLoginButton/>

                <div className="registerContainer">
                    <span>회원이 아니신가요?</span> <span className="registerSpan" onClick={setRegisterModal}>회원가입</span>
                </div>

            </div>
        </div>
    );
};

export default LoginModal;
