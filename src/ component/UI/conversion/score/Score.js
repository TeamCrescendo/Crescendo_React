import React, {useState} from 'react';
import {Document, Page} from "react-pdf";
import {getCurrentLoginUser} from "../../../util/login-util";
import "./Score.scss";
import Pagination from "@mui/material/Pagination";
import usePagination from "@mui/material/usePagination";
import {ButtonGroup} from "@mui/material";
import Button from '@mui/material/Button';


const Score = ({pdfFile}) => {

    // 현재 페이지
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Current page state

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // pdf 파일 다운로드
    const downloadPdf = () => {
        const url = URL.createObjectURL(pdfFile);
        console.log(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'example.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // 악보 공유 하는 함수
    const shareHandler = async (e) => {
        const formData = new FormData();

        formData.set("pdfFile", pdfFile, "example.pdf");

        const headers = {
            'Authorization': 'Bearer ' + token,
        };

        fetch("http://localhost:8484/api/score/share", {
            method: "PUT",
            headers: headers,
            body: formData
        })
            .then(res => res.text())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    //
    const onDocumentLoadSuccess = (document) => {
        console.log(document);
        setNumPages(document.numPages);
    };
    const pageClickHandler = (event, page) => {
        console.log(page);
        // console.log(event);
        const pageNum = parseInt(page);
        setCurrentPage(pageNum);
    }

    return (
        <div className="document">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={currentPage}/>
            </Document>
            <ButtonGroup
                // className = "button-zip"
                variant="contained"
                aria-label="outlined primary button group"
                sx={{mt:2.5, mb:6.2}}
                // fullWidth={true}
            >
                <Button>저장하기</Button>
                <Button>공유하기</Button>
            </ButtonGroup>
            <Pagination
                        className="pagination"
                        count={numPages}
                        onChange={pageClickHandler}
                        size={"large"}
            />
        </div>
    );
};

export default Score;