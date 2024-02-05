import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {Grid, ImageList, ImageListItem, Skeleton} from "@mui/material";
import {getCurrentLoginUser} from "../../../util/login-util";
import Pagination from "@mui/material/Pagination";
import {Document, Page, pdfjs} from "react-pdf";
import BoardDetail from "../../board/board_list/board_detail/BoardDetail";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import boardDetail from "../../board/board_list/board_detail/BoardDetail";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Board = ({isForward}) => {
    const [scoreDetailOpen, setScoreDetailOpen] = useState(false);
    // 보드 디테일 클릭 참거짓
    const [detailClick, setDetailClick] = useState(false);
    // 보드 로딩 참 거짓
    const [boardsLoading, setBoardsLoading] = useState(true);
    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 보드 디테일 정보
    const [boardDetail, setBoardDetail] = useState({});
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


    // 디테일 클릭하는 함수
    const detailHandler = (e) => {
        // 어떤 보드인지
        console.log(boards[e.target.classList[1]]);

        // 디테일 클릭함
        setBoardDetail({
            pdfFile: pdfFiles[e.target.classList[1]],
            boardTitle: boards[e.target.classList[1]].boardTitle,
            boardNo: boards[e.target.classList[1]].boardNo,
        });
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
                    <>
                        <Grid container spacing={15} className="grid" sx={{width: 1220, height: 900, p: 2}}>
                            {
                                pdfFiles.map((item, i) =>
                                    (
                                        <Grid xs={6} key={item.scoreNo} className="grid-item">
                                            <Document file={item} onLoadSuccess={onDocumentLoadSuccess}
                                                      className="document">
                                                <Page pageNumber={1}/>
                                            </Document>
                                            <div className={`image-text ${i}`} onClick={detailHandler}
                                                 id={item.scoreNo}>
                                                곡명
                                                <span className={`score-title ${i}`}>{item.boardTitle}</span>
                                                <div className={`score-info ${i}`}><span>자세히 보기</span></div>
                                            </div>
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                        <Pagination
                            className="pagination"
                            // count={numPages}
                            // onChange={pageClickHandler}
                            size={"large"}
                        />
                    </>
                )
            }
            {detailClick && <BoardDetail
                boardDetailInfo={boardDetail}
                detailCloseHandler={detailCloseHandler}
                token={token}
            />

            }
            {
                boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>
            }
        </div>
    )
        ;
};

export default Board;