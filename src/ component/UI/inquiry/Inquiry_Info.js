import React, {useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import './Inquiry_Info.scss';
import InquiryButton from "../button/inquiry_modal_btn/Inquiry_modal_Button";
import ModifyModal from "../modal/modify_modal/Modify_modal";
import InquiryModal from "../modal/inquiry_modal/Inquiry_modal";
import InquiryModalButton from "../button/inquiry_modal_btn/Inquiry_modal_Button";

const InquiryInfo = ({ loginInfo }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const modifyButtonClick = () => {
        setModifyModalOpen(true);
    };

    function createData(title, content, inquiry_time) {
        return { title, content, inquiry_time };
    }

    const rows = [
        createData('업로드가 잘 안됩니다.', '어떤일이 있었냐면', "1일전"),
        createData('등록이 잘 안되요.', '어떤일이 있었냐면', "3일전"),
        createData('아이디는 못바꾸나요.', '어떤일이 있었냐면', "7일전"),
    ];

    return (
        <>
            <div className="inquiry-info-container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead className="tHead">
                            <TableRow>
                                <TableCell>문의제목</TableCell>
                                <TableCell align="right">문의내용</TableCell>
                                <TableCell align="right">문의시각</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {rows.map((row) => (
                                <TableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.content}</TableCell>
                                    <TableCell align="right">{row.inquiry_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <InquiryModalButton  onClose={() => setModifyModalOpen(false)}
                            modifyButtonClick={modifyButtonClick} />
            {modifyModalOpen && <InquiryModal loginInfo={loginInfo} onClose={() => setModifyModalOpen(false)}/>}
        </>
    );
};

export default InquiryInfo;