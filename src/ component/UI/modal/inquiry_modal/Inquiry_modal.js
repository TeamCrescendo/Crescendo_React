import React, {useRef, useState} from 'react';

import './Inquiry_modal.scss';
import {GrClose} from "react-icons/gr";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import TextField from '@mui/material/TextField';
import InquiryButton from "../../button/inpuiry/Inquiry_Button";
import {AUTH_URL, INQUIRY_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";

const InquiryModal = ({ onClose, loginInfo }) => {
    const modalBackground = useRef();
    const [userValue, setUserValue] = useState({
        title: '',
        content: '',
    });

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
    const inquirySubmit = e => {
        e.preventDefault();

        fetch(INQUIRY_URL, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                account: loginInfo.account,
                title: userValue.title,
                content: userValue.content
            }),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(save => {
                if (save) {
                    alert("문의전송 성공!");
                    onClose();
                } else {
                    alert("문의전송 실패!");
                }
            })

    }

    return (
        <div className="inquiry-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="inquiry-modal-content">
                <button className="inquiryModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>


                <div className="inquiry-modal-title">
                    <h2>문의 등록</h2>
                </div>
                <span className="user-name">회원명: {loginInfo.userName}({loginInfo.account})</span>
                <form className="inquiry-input-form" onSubmit={inquirySubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        label="문의 제목"
                        placeholder="제목을 입력하세요."
                        className="inquiry-input-title"
                        onChange={titleHandler}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="문의 내용"
                        placeholder="내용을 입력하세요."
                        className="inquiry-input-content"
                        multiline
                        rows={10}
                        onChange={contentHandler}
                    />
                    <InquiryButton />
                </form>


            </div>
        </div>
    );
};

export default InquiryModal;