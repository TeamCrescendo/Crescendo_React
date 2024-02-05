import React, {useEffect, useState} from 'react';


import './Admin_Inquiry_Info.scss';
import {getCurrentLoginUser} from "../../../util/login-util";
import {INQUIRY_URL} from "../../../../config/host-config";
import InquiryContentModalButton from "../../button/inquirt_content_modal_button/Inquiry_Content_Modal_Button";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InquiryContentModal from "../../modal/inquiry_content_modal/Inquiry_Content_Modal";
import InquiryModal from "../../modal/inquiry_modal/Inquiry_modal";


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

    function createData(title, content, inquiry_time, inquiryId) {
        return { title, content, inquiry_time, inquiryId };
    }

    function formatDate(timeString) {
        const today = new Date();
        const date = new Date(timeString);
        const diffTime = today - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return '오늘';
        } else if (diffDays === 1) {
            return '어제';
        } else if (diffDays <= 7) {
            return `${diffDays}일전`;
        } else if (diffDays <= 30) {
            const diffWeeks = Math.floor(diffDays / 7);
            return `${diffWeeks}주전`;
        } else if (diffDays <= 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths}개월전`;
        } else {
            const diffYears = Math.floor(diffDays / 365);
            return `${diffYears}년전`;
        }
    }

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    // 문의목록 전체조회 (본인것만)
    const selectMyInquiry = e => {
        fetch(INQUIRY_URL + `?account=${loginInfo.account}`, {
            method: 'GET',
            headers: requestHeader
        })
            .then(res => res.json())
            .then(json => {
                const updatedRows = json.map(inquiry => {
                    const formatTime = formatDate(inquiry.createTime);
                    return createData(inquiry.inquiryTitle, inquiry.inquiryContent, formatTime, inquiry.inquiryId);
                });
                setRows(updatedRows);
            })

    }

    const deleteInqHandler = (inquiryId) => {
        if (window.confirm("해당 문의를 삭제하시겠습니까?")) {

            fetch(INQUIRY_URL + "?inquiryId=" + inquiryId, {
                method: 'DELETE',
                headers: requestHeader
            })
                .then(res => res.json())
                .then(b => {
                    if (b) {
                        alert("해당 문의가 삭제되었습니다!");
                        selectMyInquiry();
                    } else {
                        alert("문의 삭제가 실패했습니다!");
                    }
                })


        }
    }

    // let rows = [
    //     // createData('업로드가 잘 안됩니다.', '어떤일이 있었냐면', "1일전"),
    //     // createData('등록이 잘 안되요.', '어떤일이 있었냐면', "3일전"),
    //     // createData('아이디는 못바꾸나요.', '어떤일이 있었냐면', "7일전"),
    // ];

    useEffect(() => {
        selectMyInquiry();
    }, [contentModalOpen, inquiryModalOpen]);

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
                                <div>{row.inquiry_time}</div>
                                <div>
                                    <InquiryContentModalButton row={{ content: row.content, title: row.title, inquiryId: row.inquiryId
                                        , time: row.inquiry_time }} onClose={() => setContentModalOpen(false)}
                                                               modifyButtonClick={contentButtonClick} />
                                </div>
                                {/*<div><RiChatDeleteFill onClick={() => deleteInqHandler(row.inquiryId)} style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>*/}
                                <div>
                                    <IconButton aria-label="delete" size="large" onClick={() => deleteInqHandler(row.inquiryId)} style={{color:"red", cursor:"pointer"}}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {contentModalOpen && <InquiryContentModal row={data}  onClose={() => setContentModalOpen(false)}/>}
            {inquiryModalOpen && <InquiryModal onClose={() => setInquiryModalOpen(false)} loginInfo={loginInfo}/>}
        </>
    );
};

export default AdminInquiryInfo;