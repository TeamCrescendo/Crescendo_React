import React, {useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import LoginButton from "../../button/login/original_login/Login_Button";
import GoogleLoginButton from "../../button/login/google_login/Google_Login_Button";
import './Find_Password_Modal.scss';
import PwChangeButton from "../../button/pw_change/PwChangeButton";
import UserCheckButton from "../../button/pw_change/User_Check_Button";

const FindPasswordModal = ({ onClose }) => {
    const modalBackground = useRef();
    // 상태변수 관리
    const [account, setAccount] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isUser, setIsUser] = useState(false);

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };

    const userOk = () => {
        setIsUser(true);
        alert("회원정보가 확인되었습니다!");
    }

    return (
        <div className="pw-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="pw-modal-content">
                <button className="pwModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>
                <div className="pw-modal-title">
                    <h2>비밀번호 찾기</h2>
                </div>

                <form className="pw-input-form">
                    {
                        isUser
                        ?
                        (
                            <input
                            type="password"
                            className="pw-password"
                            placeholder="패스워드 입력"
                            onChange={(e) => setNewPassword(e.target.value)}/>
                        )
                        :
                        (
                            <>
                                <input
                                    type="text"
                                    className="pw-account"
                                    placeholder="아이디 입력"
                                    onChange={(e) => setAccount(e.target.value)}/>
                                <input
                                    type="text"
                                    className="pw-email"
                                    placeholder="이메일 입력"
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </>
                        )
                    }

                    {
                        isUser
                        ? <PwChangeButton onClose={onClose} account={account} email={email} newPassword={newPassword} />
                        : <UserCheckButton oncheck={userOk} account={account} email={email} />
                    }

                </form>
            </div>
        </div>
    );
};

export default FindPasswordModal;