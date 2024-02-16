import React, {useEffect, useState} from 'react';


import './Admin_Inquiry_Info.scss';
import {getCurrentLoginUser} from "../../../util/login-util";
import {INQUIRY_URL} from "../../../../config/host-config";
import InquiryContentModalButton from "../../button/inquirt_content_modal_button/Inquiry_Content_Modal_Button";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InquiryContentModal from "../../modal/inquiry_content_modal/Inquiry_Content_Modal";
import InquiryModal from "../../modal/inquiry_modal/Inquiry_modal";
import AdminInquiryContentModal from "../../modal/inquiry_content_modal/forAdmin/Admin_Inquiry_Content_Modal";
import InquiryContentModalButton2 from "../../button/inquirt_content_modal_button/Inquiry_Content_Modal_Button2";


const AdminInquiryInfo = ({ loginInfo }) => {
    const [contentModalOpen, setContentModalOpen] = useState(false);
    const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [data, setData] = useState();

    const contentButtonClick = (row) => {
        setContentModalOpen(true);
        setData(row);
    };
    const inquiryButtonClick = e => {
        setInquiryModalOpen(true);
    };

    function createData(title, content, formatTime, inquiryId, account, check) {
        return { title, content, formatTime, inquiryId, account, check };
    }

    function formatDate(timeString) {
        const today = new Date();
        const date = new Date(timeString);
        const diffTime = today.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return '오늘';
        } else if (diffDays === 1) {
            return '어제';
        } else if (diffDays <= 7) {
            return `${diffDays}일 전`;
        } else if (diffDays <= 30) {
            const diffWeeks = Math.floor(diffDays / 7);
            return `${diffWeeks}주 전`;
        } else if (diffDays <= 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths}개월 전`;
        } else {
            const diffYears = Math.floor(diffDays / 365);
            return `${diffYears}년 전`;
        }
    }

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    // 문의목록 전체 내역 조회
    const selectMyInquiry = e => {
        fetch(INQUIRY_URL + "/all", {
            method: 'GET',
            headers: requestHeader
        })
            .then(res => {
                if(res.ok) return res.json();
                else if(res.status===400) alert("문의내역 조회 에러발생!");
            })
            .then(json => {
                const updatedRows = json.map(inquiry => {
                    const formatTime = formatDate(inquiry.createTime);
                    return createData(inquiry.inquiryTitle, inquiry.inquiryContent, formatTime, inquiry.inquiryId, inquiry.account, inquiry.check);
                });
                setRows(updatedRows);
            })

    }


    useEffect(() => {
        selectMyInquiry();
    }, [contentModalOpen, inquiryModalOpen]);

    const closeHandler = () => {
        setContentModalOpen(false);
        selectMyInquiry();
    }
    const closeHandler2 = () => {
        setInquiryModalOpen(false);
        selectMyInquiry();
    }


    return (
        <>
            <div className="inquiry-info-container">
                <div className="table-container">
                    <div className="table-row">
                        <div className="content">문의내역</div>
                        {/*<div></div>*/}
                        <div>문의시각</div>
                        <div>문의접수</div>
                        <div>문의유저</div>
                        {/*<div><InquiryModalButton inquiryButtonClick={inquiryButtonClick} onClose={() => setContentModalOpen(false)}/></div>*/}
                    </div>
                    <div className="inquiry-scroll-container">
                        {rows.map((row) => (
                            <div className="table-data" key={row.inquiryId}>
                                <div className="content"> {row.title}</div>
                                {/*<div className="content">{row.content}</div>*/}
                                <div>{row.formatTime}</div>
                                {
                                    row.check
                                    ?
                                        (
                                            <div>
                                                <InquiryContentModalButton2 />
                                            </div>
                                        )
                                    :
                                        (
                                            <div>
                                                <InquiryContentModalButton row={{ content: row.content, title: row.title, inquiryId: row.inquiryId
                                                    , time: row.formatTime, account: row.account, check:row.check }} onClose={() => setContentModalOpen(false)}
                                                                           modifyButtonClick={contentButtonClick} />
                                            </div>
                                        )
                                }
                                {/*<div>*/}
                                {/*    <InquiryContentModalButton row={{ content: row.content, title: row.title, inquiryId: row.inquiryId*/}
                                {/*        , time: row.inquiry_time, account: row.account, check:row.check }} onClose={() => setContentModalOpen(false)}*/}
                                {/*                               modifyButtonClick={contentButtonClick} />*/}
                                {/*</div>*/}
                                {/*<div><RiChatDeleteFill onClick={() => deleteInqHandler(row.inquiryId)} style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>*/}
                                {/*<div>*/}
                                {/*    <IconButton aria-label="delete" size="large" onClick={() => deleteInqHandler(row.inquiryId)} style={{color:"red", cursor:"pointer"}}>*/}
                                {/*        <DeleteIcon fontSize="inherit" />*/}
                                {/*    </IconButton>*/}
                                {/*</div>*/}
                                <div>{row.account}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {contentModalOpen && <AdminInquiryContentModal row={data}  onClose={closeHandler}/>}
            {inquiryModalOpen && <InquiryModal onClose={closeHandler2} loginInfo={loginInfo}/>}
        </>
    );
};

export default AdminInquiryInfo;