import React, {useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InquiryButton from "../../button/inpuiry/Inquiry_Button";
import './Message_modal.scss';

const MessageModal = ({ onClose, row }) => {
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
                    발신자: {row.senderNickName ? `${row.senderNickName}(${row.sender})` : row.sender}
                </span>
                <span className="receiver-name">
                    수신자: {row.receiverFormat ? `${row.receiverFormat}` : row.receiver}
                </span>

                <span className="message-content">
                    {row.content}
                </span>

            </div>
        </div>
    );
};

export default MessageModal;