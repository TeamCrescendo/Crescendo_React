import React, {useRef} from 'react';
import {GrClose} from "react-icons/gr";
import './Inquiry_Content_Modal.scss';

const InquiryContentModal = ({ row, onClose }) => {
    const modalBackground = useRef();
    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    return (
        <div className="inquiry-content-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="inquiry-content-modal-content">
                <button className="inquiryContentModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>


                <div className="inquiry-content-modal-title">
                    <h2>문의 내용확인</h2>
                </div>
                <span className="sender-name">
                    문의제목: {row.title}
                </span>
                <span className="inquiry-time">
                    문의시간: {row.time}
                </span>

                <span className="inquiry-content">
                    {row.content}
                </span>

            </div>
        </div>
    );
};

export default InquiryContentModal;