import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {ImageList, ImageListItem, Skeleton} from "@mui/material";
import {getCurrentLoginUser} from "../../../util/login-util";
import {Document, Page, pdfjs} from "react-pdf";
import BoardDetail from "../../board/board_list/board_detail/BoardDetail";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Board = ({isForward}) => {
    const [scoreDetailOpen, setScoreDetailOpen] = useState(false);
    // 보드 디테일 클릭 참거짓
    const [detailClick, setDetailClick] = useState(false);
    // 보드 로딩 참 거짓
    const [boardsLoading, setBoardsLoading] = useState(true);
    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 보드들을 담아두는 배열
    const [itemData, setItemData] = useState([]);
    // 보드 정보 배열
    const [boards, setBoards] = useState([]);
    const [getBoards, setGetBoards] = useState(false);
    // pdf 파일 배열
    const [pdfFiles, setPdfFiles] = useState([]);
    const [getPdfFiles, setGetPdfFiles] = useState(false);
    // 처음 시작 확인
    const [first, setFirst] = useState(false);


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // 모든 보드 정보 불러오기
    useEffect(() => {
        if (!first) {
            getBoard();
            setFirst(true);
        }
    }, [first]);

    // 서버에서 모든 보드 불러오기
    const getBoard = async () => {
        const res = await fetch("http://localhost:8484/api/board/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await res.json();
        console.log(json);
        console.log(json.boards);
        setBoards([...json.boards]);
        setGetBoards(true);
        await getFetchPdfFiles();
        // renderingBoard(json);

    }

    const getFetchPdfFiles = async () => {
        const res = await fetch("http://localhost:8484/api/board/pdf", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await res.json();
        console.log(json);
        const file = new File([json[2]], 'example.pdf', { type: 'application/pdf' });
        console.log(file)
        setPdfFiles([...json]);

        setGetPdfFiles(true);
    }
    // useEffect(() => {
    //     if(getPdfFiles && getBoards){
    //         console.log("둘다 가져옴");
    //         console.log(getBoards);
    //         console.log(pdfFiles);
    //         console.log(new Uint8Array(...pdfFiles[0]));
    //         const pdfFilesBlob=pdfFiles.map((file)=> {
    //             new Blob([new Uint8Array(file)], {type:"application/pdf"});
    //         });
    //         console.log(pdfFilesBlob);
    //         const pdfFilesFile=pdfFilesBlob.map((blob)=>{
    //             new File([blob], "example.pdf", {type: "application/pdf"});
    //         });
    //         console.log(pdfFilesFile);
    //     }
    // }, [pdfFiles]);


    // 디테일 클릭하는 함수
    const detailHandler = (e) => {
        // 디테일 클릭함
        console.log(itemData[e.target.id - 1]);
        setDetailClick(true);
    }

    // 디테일 끄는 함수
    const detailCloseHandler = (e) => {
        setDetailClick(false);
    }

    // PDF파일 잘 불러오면 하는 함수
    const onDocumentLoadSuccess = () => {

    }

    return (
        <div className={`boardContainer ${setAnimation}`}>
            {/*{!boardsLoading && <div className="ssibal">{itemData.length}</div>}*/}
            {!detailClick && !boardsLoading && (
                pdfFiles.map((item) => (
                    <div className="boardContainer">
                        <Document file={item} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={1}/>
                        </Document>
                        {/*<div className="image-text" onClick={detailHandler} id={item.scoreNo}>*/}
                        {/*    곡명*/}
                        {/*    <span className="score-title">{item.boardTitle}</span>*/}
                        {/*    <div className="score-info"><span>자세히 보기</span></div>*/}
                        {/*</div>*/}
                    </div>
                ))
            )}
            {/*{detailClick && <BoardDetail boardDetailInfo={} detailCloseHandler={detailCloseHandler}/>}*/}
            {boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>}
        </div>
    )
        ;
};

export default Board;