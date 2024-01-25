import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import './User_Total.scss';
import {RiChatDeleteFill} from "react-icons/ri";

const UserTotal = () => {
    function createData(title, viewCount, like, dislike, downloadCount) {
        return { title, viewCount, like, dislike, downloadCount };
    }

    const rows = [
        createData('엘리제를 위하여', 159, 6, 24, 4),
        createData('젓가락 행진곡', 237, 9, 37, 4),
        createData('아무노래', 262, 16, 24, 6),
        createData('너를위해서', 305, 3, 67, 4),
        createData('좋은 날', 356, 16, 49, 3),
        createData('좋은 2', 356, 16, 49, 3),
    ];

    return (
        <div className="user-total-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead className="tHead">
                        <TableRow>
                            <TableCell>공유 악보 (최신순)</TableCell>
                            <TableCell align="right">조회수</TableCell>
                            <TableCell align="right">좋아요</TableCell>
                            <TableCell align="right">싫어요</TableCell>
                            <TableCell align="right">다운로드 횟수</TableCell>
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
                                <TableCell align="right">{row.viewCount}회</TableCell>
                                <TableCell align="right">{row.like}개</TableCell>
                                <TableCell align="right">{row.dislike}개</TableCell>
                                <TableCell align="right">{row.downloadCount}번</TableCell>
                                <TableCell align="right"><RiChatDeleteFill style={{cursor:"pointer"}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserTotal;