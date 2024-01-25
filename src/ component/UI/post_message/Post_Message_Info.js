import React, {useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { RiChatDeleteFill } from "react-icons/ri";


import InquiryButton from "../button/inquiry_modal_btn/Inquiry_modal_Button";
import ModifyModal from "../modal/modify_modal/Modify_modal";
import InquiryModal from "../modal/inquiry_modal/Inquiry_modal";
import InquiryModalButton from "../button/inquiry_modal_btn/Inquiry_modal_Button";
import {AUTH_URL, INQUIRY_URL, MESSAGE_URL} from "../../../config/host-config";
import {getCurrentLoginUser} from "../../util/login-util";

const PostMessageInfo = ({ loginInfo }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const modifyButtonClick = () => {
        setModifyModalOpen(true);
    };

    function createData(status, content, post_time) {
        return { status, content, post_time };
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

    // 쪽지목록 전체조회 (본인관련)
    const selectMyPostMessage = e => {
        fetch(MESSAGE_URL + '/all', {
            method: 'GET',
            headers: requestHeader
        })
            .then(res => res.json())
            .then(json => {
                const updatedRows = json.map(message => {
                    const formatTime = formatDate(message.createTime);
                    return createData(, inquiry.inquiryContent, formatTime);
                });
                setRows(updatedRows);
            })
    }

    // let rows = [
    //     createData('발신', '다른곡도 공유해주세요', "1일전"),
    //     createData('수신', '님 신고함 ㅋㅋ', "3일전"),
    //     createData('수신', '이상한거 올리네 신고함', "7일전"),
    // ];

    useEffect(() => {
        selectMyPostMessage();
    }, [modifyModalOpen]);

    return (
        <>
            <div className="post-message-info-container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead className="tHead">
                            <TableRow>
                                <TableCell>수신/발신여부</TableCell>
                                <TableCell align="right">쪽지내용</TableCell>
                                <TableCell align="right">쪽지시각</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {rows.map((row) => (
                                <TableRow
                                    key={row.status}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="right">{row.content}</TableCell>
                                    <TableCell align="right">{row.post_time}</TableCell>
                                    <TableCell align="right"><RiChatDeleteFill style={{cursor:"pointer"}}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/*<InquiryModalButton  onClose={() => setModifyModalOpen(false)}*/}
            {/*                     modifyButtonClick={modifyButtonClick} />*/}
            {/*{modifyModalOpen && <InquiryModal loginInfo={loginInfo} onClose={() => setModifyModalOpen(false)}/>}*/}
        </>
    );
};

export default PostMessageInfo;