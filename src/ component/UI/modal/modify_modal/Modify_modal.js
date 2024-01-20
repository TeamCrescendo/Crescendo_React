import React, {useRef, useState} from 'react';

import './Modify_modal.scss';
import {GrClose} from "react-icons/gr";


const ModifyModal = ({ onClose, loginInfo }) => {
    const modalBackground = useRef();
    const URL = "http://localhost:8484/api/auth";
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    // X 버튼을 눌러도 모달이 사라짐
    const modifyClose = e => {
        onClose();
    }

    // 로그인 버튼을 눌렀을 때
    const modifySubmit = e => {
        e.preventDefault();

        fetch(`${URL}/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account,
                password: password,
                email: email,
                userName: userName
            }),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === true) {

                } else {
                }
            })

    }


    return (
        <div className="modify-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="modify-modal-content">
                <button className="modifyModalCloseBtn" onClick={modifyClose}>
                    <GrClose/>
                </button>
                <div className="modify-modal-title">
                    <h2>회원정보 수정</h2>
                </div>

                <form className="modify-input-form" onSubmit={modifySubmit}>
                    <input
                        type="text"
                        className="input-account"
                        placeholder="아이디"
                        value={loginInfo.account}
                        onChange={(e) => setAccount(e.target.value)}
                        readOnly="true"
                    />
                    <input
                        type="email"
                        className="input-email"
                        placeholder="이메일"
                        value={loginInfo.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-userName"
                        placeholder="닉네임"
                        value={loginInfo.userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-password"
                        placeholder="패스워드"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-password2"
                        placeholder="패스워드 확인"
                        value={password}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};

export default ModifyModal;