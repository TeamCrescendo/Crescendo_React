import React, { useEffect, useRef, useState } from 'react';
import { GrClose } from "react-icons/gr";
import './Admin_Inquiry_Content_Modal.scss';
import Textarea from "@mui/joy/Textarea";
import { SiDocusaurus } from "react-icons/si";
import { getCurrentLoginUser } from "../../../../util/login-util";
import {INQUIRY_URL, MESSAGE_URL} from "../../../../../config/host-config";

const AdminInquiryContentModal = ({ row, onClose }) => {
    const [text, setText] = useState("");
    const modalBackground = useRef();

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };

    const addText = () => {
        const answer = "[문의내용]\n" + row.content + "\n\n[문의답변]\n" + text;
        if (text.length < 5) {
            alert("5글자 이상 입력해야 합니다!");
            return;
        }
        sendAnswerForUser(answer);
    }

    const[token, setToken] = useState(getCurrentLoginUser().token);
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const sendAnswerForUser = (answer) => {
        fetch(MESSAGE_URL, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                account: "root",
                content: answer,
                receiver: row.account
            }),
            credentials: 'include',
        })
            .then(res => {
                if(res.ok) {
                    alert("문의답변 쪽지 전송완료!");
                    checkInquiry();
                    onClose();
                } else if(res.status === 400) {
                    alert("쪽지 전송 오류!");
                }
            });
    }

    const checkInquiry =() =>{
        fetch(INQUIRY_URL+"/check/"+row.inquiryId, {
            method: "GET",
            headers: requestHeader
        }).then(res=>{
            if (res.ok){
                console.log("123");
            }
        })
    }
    return (
        <div className="inquiry-content-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="adinquiry-content-modal-content">
                <button className="inquiryContentModalCloseBtn" onClick={onClose}>
                    <GrClose />
                </button>

                <div className="inquiry-content-modal-title">
                    <h2>문의 답변</h2>
                </div>
                <span className="sender-name">
                    문의제목: {row.title}
                </span>
                <span className="inquiry-content">
                    {row.content}
                </span>

                <Textarea
                    className="inquiry-return"
                    startDecorator={
                        <div>
                            <SiDocusaurus /> 문의접수
                        </div>
                    }
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    minRows={5}
                    maxRows={7}
                    sx={{ minWidth: 500 }}
                />
                <button className="inquiry-return-btn" onClick={addText}>전송하기</button>
            </div>
        </div>
    );
};

export default AdminInquiryContentModal;
