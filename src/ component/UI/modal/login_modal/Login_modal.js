import React, {useEffect, useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import './Login_modal.scss';
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import {AUTH_URL, MEMBER_URL} from "../../../../config/host-config";
import {getCurrentLoginUser, TOKEN, USERNAME} from "../../../util/login-util";
import GoogleLoginButton from "../../button/login/google_login/Google_Login_Button";
import RegisterModal from "../register_modal/Register_modal";
import Find_Password_Modal from "../find_password_modal/Find_Password_Modal";


const LoginModal = ({onClose, registerHandler, isLogin, LoginCheck, googleLogin}) => {
    const modalBackground = useRef();
    // 상태변수 관리
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [pwModalOpen, setPwModalOpen] = useState(false);

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
    const setPwModal = () => {
        setPwModalOpen(true);
    }




    // 로그인 버튼을 눌렀을 때
    const loginSubmit = async e => {
        e.preventDefault();

        const res = await fetch(AUTH_URL + "/login", {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                account: account,
                password: password,
                autoLogin: autoLogin
            })
        });

        if (res.status === 400) {
            const text = await res.text();
            alert(text);
            return;
        }
        if (res.status === 200) {
            const {token, userName, auth} = await res.json();

            localStorage.setItem(TOKEN, token);
            localStorage.setItem(USERNAME, userName);

            window.location.reload();
        }


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

                <form className="login-input-form">
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
                        <span className="pwfindSpan" onClick={setPwModal}>비밀번호 찾기</span>
                    </div>
                    <LoginButton loginSubmit={loginSubmit}/>
                </form>

                {/*<KakaoLoginButton />*/}
                <GoogleLoginButton googleLogin={googleLogin}/>

                <div className="registerContainer">
                    <span>회원이 아니신가요?</span> <span className="registerSpan"  onClick={setRegisterModal}>회원가입</span>
                </div>

                {pwModalOpen && <Find_Password_Modal onClose={() => setPwModalOpen(false)}/>}

            </div>
        </div>
    );
};

export default LoginModal;
