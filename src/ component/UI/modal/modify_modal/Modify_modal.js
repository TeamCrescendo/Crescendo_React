import React, {useEffect, useRef, useState} from 'react';

import './Modify_modal.scss';
import {GrClose} from "react-icons/gr";
import {FiAlertCircle} from "react-icons/fi";
import RegisterButton from "../../button/register/Register_Button";
import ModifyButton from "../../button/modify/Modify_Button";
import QuitButton from "../../button/quit/Quit_Button";


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
        console.log("123");
        if (
            password.length === 0 || password2.length === 0
        ) {
            alert("비밀번호를 올바르게 입력해주세요");
            return;
        }


        e.preventDefault();

        fetch(`${URL}/modify`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account,
                userName: userName,
                password: password,
                email: email,

            }),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(flag => {
                console.log(flag);
                if (flag) {
                    alert("회원정보가 성공적으로 변경되었습니다!");
                    onClose();
                } else {
                    alert("회원정보 변경에 실패했습니다!");
                }
            })

    }

    useEffect(() => {
        setAccount(loginInfo.account);
    }, []);


    return (
        <div className="modify-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="modify-modal-content">
                <button className="modifyModalCloseBtn" onClick={modifyClose}>
                    <GrClose/>
                </button>
                <div className="modify-modal-title">
                    <h2>회원정보 수정</h2>
                </div>

                <div className="modify-container">
                    <form className="modify-input-form" onSubmit={modifySubmit}>
                        {/*<div className="exDiv">*/}
                        {/*    <span>아이디 <FiAlertCircle /></span>*/}
                        {/*</div>*/}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    className="input-account"*/}
                        {/*    value={loginInfo.account}*/}
                        {/*    onChange={(e) => setAccount(e.target.value)}*/}
                        {/*    readOnly="true"*/}
                        {/*    style={{ color: 'gray' }}*/}
                        {/*/>*/}
                        <div className="exDiv">
                            <span>닉네임 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="text"
                            className="input-nickname"
                            // value={loginInfo.userName}
                            placeholder={loginInfo.userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <div className="exDiv">
                            <span>이메일 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="email"
                            className="input-email"
                            // value={loginInfo.email}
                            placeholder={loginInfo.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="exDiv">
                            <span>비밀번호 <FiAlertCircle /></span>
                        </div>
                        <input
                            type="password"
                            className="input-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="exDiv">
                            <span>비밀번호 확인</span>
                        </div>
                        <input
                            type="password"
                            className="input-password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </form>
                    <div className="modify-profile-img-container">
                        <img className="imgtest" src="img/default_profile.png" alt="기본 프로필" />

                        <div className="img-title">
                            프로필 변경
                        </div>
                        <QuitButton />
                        <ModifyButton modifySubmit={modifySubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyModal;