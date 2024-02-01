import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {ImageList, ImageListItem, Skeleton} from "@mui/material";
import {getCurrentLoginUser} from "../../../util/login-util";
import {Document, Page} from "react-pdf";
import BoardDetail from "../../board/board_list/board_detail/BoardDetail";

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


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // 모든 보드 정보 불러오기
    useEffect(() => {
        getBoard();
    }, []);

    // 서버에서 모든 보드 불러오기
    const getBoard = async () => {
        const res = await fetch("http://localhost:8484/api/board/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const json = await res.json();
        renderingBoard(json);
    }

    // 보드를 화면 그리기 위한 함수
    const renderingBoard = ({boards, pdfFile}) => {
        // console.log(boards);
        console.log("배열의 길이", boards.length);
        const newItems = boards.map((board, i) => ({
            boardTitle: board.boardTitle,
            boardNo: board.boardNo,
            boardPdf: pdfFile[i]
        }));
        setItemData(prevData => [...prevData, ...newItems]);
        console.log(itemData);
        setBoardsLoading(false);
    }
    

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
                itemData.map((item) => (
                    <div className="boardContainer">
                        <Document file={item.boardPdf} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={1}/>
                        </Document>
                        <div className="image-text" onClick={detailHandler} id={item.scoreNo}>
                            곡명
                            <span className="score-title">{item.boardTitle}</span>
                            <div className="score-info"><span>자세히 보기</span></div>
                        </div>
                    </div>
                ))
            )}
            {detailClick && <BoardDetail boardDetailInfo={boardDetailInfo} detailCloseHandler={detailCloseHandler}/>}
            {boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>}
        </div>
    )
        ;
};

export default Board;