import React, {useRef, useState} from 'react';

import './BoardMessageModal.scss';
import {GrClose} from "react-icons/gr";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import TextField from '@mui/material/TextField';
import InquiryButton from "../../button/inpuiry/Inquiry_Button";
import {AUTH_URL, MESSAGE_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";
import Button from "react-bootstrap/Button";

const InquiryModal = ({ onClose, createMember, writeAccount }) => {
    const modalBackground = useRef();
    const [userValue, setUserValue] = useState({
        title: '',
        content: '',
    });
    // 내 정보


    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };



    const titleHandler = e => {
        const inputValue = e.target.value;

        setUserValue({
            ...userValue,
            title: inputValue
        })
    }

    const contentHandler = e => {
        const inputValue = e.target.value;

        setUserValue({
            ...userValue,
            content: inputValue
        })
    }
    const[token, setToken] = useState(getCurrentLoginUser().token);
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    // 문의전송 버튼을 눌렀을 때
    const messageSubmit = e => {
        e.preventDefault();
        fetch(MESSAGE_URL, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                account: writeAccount,
                content: userValue.content,
                receiver: createMember
            }),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(save => {
                console.log(save);
            })

    }

    return (
        <div className="inquiry-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="inquiry-modal-content">
                <button className="inquiryModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>


                <div className="inquiry-modal-title">
                    <h2>{createMember}에게 메세지 보내기</h2>
                </div>
                {/*<span className="user-name">회원명: {loginInfo.userName}({loginInfo.account})</span>*/}
                <form className="inquiry-input-form" onSubmit={messageSubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        label="메세지"
                        placeholder="내용을 입력하세요."
                        className="inquiry-input-content"
                        multiline
                        rows={10}
                        onChange={contentHandler}
                    />
                    <Button type="submit" variant="success" className="inquiry-btn">메세지 전송</Button>{' '}
                </form>


            </div>
        </div>
    );
};

export default InquiryModal;