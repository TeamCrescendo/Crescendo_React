import React, {useEffect, useState} from 'react';
import {Document, Page} from "react-pdf";
import {getCurrentLoginUser} from "../../../util/login-util";
import "./Score.scss";
import Pagination from "@mui/material/Pagination";
import usePagination from "@mui/material/usePagination";
import {ButtonGroup} from "@mui/material";
import Button from '@mui/material/Button';
import {DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Sheet, Typography} from "@mui/joy";
import Input from '@mui/joy/Input';
import {KeyboardArrowRight} from "@mui/icons-material";


const Score = ({pdfFile, scoreId, exitHandler}) => {

    // 현재 페이지
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [open, setOpen] = useState(false);
    const [boardTitle, setBoardTitle] = useState('');
    const [share, setShare] = useState(false);


    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // pdf 파일 다운로드
    const downloadHandler = () => {
        const url = URL.createObjectURL(pdfFile);
        console.log(url);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'example.pdf'; // 기본 파일 이름 설정

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 악보 공유 하는 함수
    const shareHandler = async (e) => {
        setOpen(true);
    }

    //
    const onDocumentLoadSuccess = (document) => {
        console.log(document);
        console.log(pdfFile);
        setNumPages(document.numPages);
    };

    const pageClickHandler = (event, page) => {
        console.log(page);
        // console.log(event);
        const pageNum = parseInt(page);
        setCurrentPage(pageNum);
    }

    // 악보 제목 작성하는 핸들러
    const titleHandler = async (e)  =>{
        e.preventDefault();
        // console.log(boardTitle);

        // 악보 아이디
        //scoreId
        // 엔드포인트
        //http://localhost:8484/api/score/share

        // 악보 제목
        if(boardTitle.length<1 || boardTitle.length>16){
            alert("제목은 1글자 이상 16글자 이하여야 합니다.");
            return;
        }
        const requestHeader = {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        const requestBody = {
            scoreNo: scoreId,
            boardTitle: boardTitle
        };
        console.log(scoreId);
        console.log(boardTitle);
        console.log(requestHeader);
        fetch("http://localhost:8484/api/board/createBoard", {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(json => {
                setShare(true);
                setOpen(false);
                // console.log(json);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const comebackHandler = () =>{
        exitHandler();
    }

    useEffect(() => {
        const binaryArray=new Uint8Array(pdfFile);
        console.log(binaryArray);
    }, []);

    const titleModifyHandler = e =>{
        setBoardTitle(e.target.value);
    }
    return (
        <>
            <div className="document">
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={currentPage}/>
                </Document>
                <ButtonGroup
                    // className = "button-zip"
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{mt: 2.5, mb: 6.2}}
                    // fullWidth={true}
                >
                    <Button onClick={comebackHandler}>돌아가기</Button>
                    <Button onClick={downloadHandler}>저장하기</Button>
                    <Button onClick={shareHandler} disabled={share}>공유하기</Button>
                </ButtonGroup>
                <Pagination
                    className="pagination"
                    count={numPages}
                    onChange={pageClickHandler}
                    size={"large"}
                />
            </div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                className="modal"
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 1000,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        width: 400
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        sx={{width: '100%'}}
                        mb={1}
                    >
                        악보 게시판의 제목을 정해주세요!!
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        <form onSubmit={titleHandler}>
                            <Input onChange={titleModifyHandler} color="success" endDecorator={
                                <Button endDecorator={<KeyboardArrowRight/>} color="success" onClick={titleHandler}>
                                    전송
                                </Button>
                            }/>
                        </form>
                    </Typography>
                </Sheet>
            </Modal>
        </>
    )
        ;
};

export default Score;