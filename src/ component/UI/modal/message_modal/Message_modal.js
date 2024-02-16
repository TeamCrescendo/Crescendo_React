import React, {useEffect, useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InquiryButton from "../../button/inpuiry/Inquiry_Button";
import './Message_modal.scss';

const MessageModal = ({ onClose, row, loginInfo }) => {
    const modalBackground = useRef();
    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };


    return (
        <div className="message-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="message-modal-content">
                <button className="messageModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>


                <div className="inquiry-modal-title">
                    <h2>쪽지 내용확인</h2>
                </div>
                <span className="sender-name">
                    {row.sender === loginInfo.userName
                        ? (<><b>발신메일</b> <b>수신자: {row.receiverFormat}</b></>)
                        : (<><b>수신메일</b> <b>발신자: {row.sender}</b></>)
                    }
                </span>
                <span className="message-content" style={{ whiteSpace: 'pre-line' }}>
                    {row.content}
                </span>

            </div>
        </div>
    );
};

export default MessageModal;