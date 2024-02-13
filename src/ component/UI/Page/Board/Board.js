import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {Grid, ImageList, ImageListItem, Skeleton} from "@mui/material";
import {getCurrentLoginUser} from "../../../util/login-util";
import Pagination from "@mui/material/Pagination";
import {Document, Page, pdfjs} from "react-pdf";
import BoardDetail from "../../board/board_detail/BoardDetail";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import boardDetail from "../../board/board_detail/BoardDetail";
import UserInfomation from "../../login_info/User_Infomation";
import {BOARD_URL} from "../../../../config/host-config";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Board = ({isForward, loginInfo, target, googleLogin, logoutHandler, loginCheck}) => {
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
    const [first, setFirst] = useState(true);
    // 보드 개수
    const [boardCount, setBoardCount] = useState(0);

    const [noBoard, setNoBoard] = useState(false);
    // 현재 페이지
    const [pageNo, setPageNo] = useState(1);
    // 총 페이지
    const [allPageNo, setAllPageNo] = useState(1);

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });


    // 모든 보드 정보 불러오기
    useEffect(() => {
        if (first) {
            console.log(loginInfo);
            getBoard();
            setFirst(false);
        }
    }, [first]);

    // 서버에서 모든 보드 불러오기
    const getBoard = () => {
        fetch(`http://localhost:8484/api/board/pageNo/${pageNo}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.status === 200) return res.json();
            else alert("서버에러입니닿ㅎ")
        }).then(json => {
            // console.log(json)
            setAllPageNo(json.allPageNo);

            if(json.list.length === 0){
                setNoBoard(true);
            }
            setPdfFiles([]);
            setBoards([...json.list]);
            setGetBoards(true);
        });
    }


    // 보드 불러온 다음에
    useEffect(() => {
        const fetchData = async () => {
            if (boards.length !== 0 && getBoards) {
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
                        // console.log(blob2);
                        // const blob = new Blob([blob2], {type: "application/pdf"});
                        // console.log(blob2);
                        const file = new File([blob], "example.pdf", {type: "application/pdf"});
                        console.log(file);
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

    // 삭제 버튼 눌렀을 때
    const deleteHandler = () =>{
        console.log("나 실행함 삭제 버튼")
        setPdfFiles([]);
        setDetailClick(false);
        setBoardsLoading(true);
        getBoard();
    }
    // 페이지 이동 했을 때
    const pageClickHandler = (event, page) =>{
        console.log(page);
        setPageNo(page);
    }


    useEffect(() => {
        if(first !== true) getBoard();
    }, [pageNo]);

    // 디테일 클릭하는 함수
    const detailHandler = (e) => {
        if(!getBoards){
            alert("아직 준비가 안되어 있음");
            return;
        }
        // 어떤 보드인지
        console.log(boards[e.target.classList[1]]);

        // 디테일 클릭함
        setBoardDetail({
            pdfFile: pdfFiles[e.target.classList[1]],
            boardTitle: boards[e.target.classList[1]].boardTitle,
            boardNo: boards[e.target.classList[1]].boardNo,
            scoreNo: boards[e.target.classList[1]].scoreNo,
            memberAccount: boards[e.target.classList[1]].memberAccount
        });
        setDetailClick(true);
    }


    // 개인서비스에서 타고 들어왔을 경우
    useEffect(() => {
        if (!boardsLoading) {
            if (target <= 1) {
                // 디테일 클릭함
                setBoardDetail({
                    pdfFile: pdfFiles[target],
                    boardTitle: boards[target].boardTitle,
                    boardNo: boards[target].boardNo,
                    scoreNo: boards[target].scoreNo,
                    memberAccount: boards[target].memberAccount
                });
                setDetailClick(true);
            }
        }
    }, [boardsLoading]);

    // 디테일 끄는 함수
    const detailCloseHandler = (e) => {
        setDetailClick(false);
    }



    return (
        <div className={`boardContainer ${setAnimation}`}>
            <div className="head">
                <UserInfomation googleLogin={googleLogin} logoutHandler={logoutHandler} loginInfo={loginInfo}/>
            </div>
            {
                !detailClick && !boardsLoading &&
                (
                    <>
                        <Grid container spacing={15} className="grid" sx={{width: 1220, height: 980, p: 2}}>
                            {
                                noBoard && <div className="no-board"  style={{display:"flex", alignItems:"center", justifyContent:"center"}}>공유된 보드가 없습니다.</div>
                            }
                            {
                                pdfFiles.map((item, i) =>
                                    (
                                        <Grid xs={6} key={item.scoreNo} className="grid-item">
                                            <Document file={item}
                                                      className="document">
                                                <Page pageNumber={1}/>
                                            </Document>
                                            <div className={`image-text ${i}`} onClick={detailHandler}
                                                 id={item.scoreNo}>
                                                악보
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
                            count={allPageNo}
                            page={pageNo}
                            // count={numPages}
                            onChange={pageClickHandler}
                            size={"large"}
                        />
                    </>
                )
            }
            {detailClick && <BoardDetail
                boardDetailInfo={boardDetail}
                scoreNo={boardDetail.scoreNo}
                loginInfo={loginInfo}
                memberAccount={boardDetail.memberAccount}
                detailCloseHandler={detailCloseHandler}
                getBoard={deleteHandler}
                token={token}
            />

            }
            {
                boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>
            }
        </div>
    );
};

export default Board;
