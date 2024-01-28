import React, {useState} from 'react';
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


const Score = ({pdfFile, scoreId}) => {

    // 현재 페이지
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [open, setOpen] = useState(false);
    const [boardTitle, setBoardTitle] = useState('');


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
        console.log(boardTitle);

        // 악보 아이디
        //scoreId
        // 엔드포인트
        //http://localhost:8484/api/score/share

        // 악보 제목

        const headers = {
            'Authorization': 'Bearer ' + token,
        };

        // fetch("http://localhost:8484/api/score/share", {
        //     method: "PUT",
        //     headers: headers,
        //     body: {
        //
        //     }
        // })
        //     .then(res => res.text())
        //     .then(json => {
        //         console.log(json);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    }

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
                    <Button onClick={downloadHandler}>저장하기</Button>
                    <Button onClick={shareHandler}>공유하기</Button>
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
                                <Button endDecorator={<KeyboardArrowRight/>} color="success">
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