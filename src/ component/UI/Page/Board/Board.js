import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {Grid, ImageList, ImageListItem, Skeleton} from "@mui/material";
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
    const getBoard = () => {
        fetch("http://localhost:8484/api/board/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log(json.boards);
            setBoards([...json.boards]);
            setGetBoards(true);
        });
    }
    // 보드 불러온 다음에
    useEffect(() => {
        const fetchData = async () => {
            if (boards.length !== 0) {
                console.log(boards);
                for (let i = 0; i < boards.length; i++) {
                    try {
                        const res = await fetch(`http://localhost:8484/api/board/${boards[i].boardNo}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        });

                        const blob = await res.blob();
                        const file = new File([blob], "example.pdf", {type: "application/pdf"});

                        // 이전 상태를 기반으로 새로운 상태를 업데이트
                        setPdfFiles(prevFiles => [...prevFiles, file]);
                    } catch (error) {
                        console.error('Error fetching PDF file:', error);
                    }
                }
            }
        };

        fetchData(); // async 함수를 호출
        setBoardsLoading(false);
    }, [boards]);

    // useEffect(()=>{
    //     if(getPdfFiles && pdfFiles !==0){
    //         console.log(pdfFiles);
    //     }
    // }, [getPdfFiles]);
    // const getFetchPdfFiles = async () => {
    //     const res = await fetch("http://localhost:8484/api/board/pdf", {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     });
    //     const json = await res.json();
    //     console.log(json);
    //     const file = new File([json[2]], 'example.pdf', { type: 'application/pdf' });
    //     console.log(file)
    //     setPdfFiles([...json]);
    //
    //     setGetPdfFiles(true);
    // }
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
            {
                !detailClick && !boardsLoading &&
                (
                    <Grid container spacing={2}  className="grid" >
                        {
                            pdfFiles.map((item) =>
                                    (
                                        <Grid xs={6} key={item.scoreNo} className="grid-item">
                                            <Document file={item} onLoadSuccess={onDocumentLoadSuccess}>
                                                <Page pageNumber={1}/>
                                            </Document>
                                            <div className="image-text" onClick={detailHandler} id={item.scoreNo}>
                                                곡명
                                                <span className="score-title">{item.boardTitle}</span>
                                                <div className="score-info"><span>자세히 보기</span></div>
                                            </div>
                                        </Grid>
                                    )
                            )
                        }
                    </Grid>
                )
            }
            {detailClick && <BoardDetail
                // boardDetailInfo={}
                detailCloseHandler={detailCloseHandler}/>
            }
            {
                boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>
            }
        </div>
    )
        ;
};

export default Board;