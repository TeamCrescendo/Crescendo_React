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
    const [scoreId, setScoreId] = useState(null);
    const [boards, setBoards] = useState([]);
    const [detailClick, setDetailClick] = useState(false);
    // 보드 로딩 참 거짓
    const [boardsLoading, setBoardsLoading] = useState(false);
    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 보드들을 담아두는 배열
    const itemData = [];

    // 보드 디테일에 들어갈 정보들
    const [boardDetailInfo, setBoardDetailInfo] = useState({
        pdfFile: "pdfFile",
        scoreNo: "scoreNo",
        scoreTitle: "scoreTitle",
    });

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // 모든 보드 정보 불러오기
    useEffect(() => {
        getBoard();
    }, []);

    // 서버에서 모든 보드 불러오기
    const getBoard =  async ()=>{
        const res = await fetch("http://localhost:8484/api/board/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await res.json();
        setBoards([...json.boards]);

    }

    // 보드 배열 받아오면 실행하는 effect
    useEffect(() => {
        const fetchPdfForBoards = async () => {
            if (boards.length !== 0) {
                console.log(boards);

                // 각각의 getPdf 호출을 Promise로 감싸고 배열에 저장
                const pdfPromises = boards.map(board =>
                    getPdf(board.boardNo, board.scoreTitle, board.scoreNo)
                );

                // 모든 getPdf 호출이 완료될 때까지 기다림
                await Promise.all(pdfPromises);

                // 모든 getPdf 호출이 완료되면 itemData 업데이트
                itemData.push(boardDetailInfo);
                console.log(itemData);
            }
        };
        fetchPdfForBoards();
    }, [boards]);

    // 보드 byte 배열 받아오는 함수
    const getPdf = async (boardNo, scoreTitle, scoreNo) => {
        console.log(`http://localhost:8484/api/board/${boardNo}`)
        const res = await fetch(`http://localhost:8484/api/board/${boardNo}`, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
        });

        const arrayBuffer = await res.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const file = new File([blob], 'example.pdf', { type: 'application/pdf' });
        setBoardDetailInfo({...boardDetailInfo, pdfFile: file, scoreNo: scoreNo, scoreTitle: scoreTitle});
    }


    useEffect(() => {
        itemData.push(boardDetailInfo);
        console.log(itemData);
    }, [boardDetailInfo]);

    // 디테일 클릭하는 함수
    const detailHandler = (e) => {
        // 디테일 클릭함
        console.log(itemData[e.target.id - 1]);
        setBoardDetailInfo({
            pdfFile: itemData[e.target.id - 1].img,
            scoreNo: itemData[e.target.id - 1].score_no,
            scoreTitle: itemData[e.target.id - 1].title
        })
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
            {!detailClick && !boardsLoading && (
                <ImageList sx={{width: 1105, height: 800, p: 2}} cols={2} rowHeight={800}
                           gap={25}
                >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} className="image-list-item" sx={{
                            border: 1,
                            borderColor: 'primary.main',
                            // p:3,
                            // m:-1
                            // gap: 10
                            // borderRadius: 2,
                            // borderRadiusColor: 'primary.main',
                        }}>
                            <img
                                className="score-img"
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                            {/* pdfFile은 이제 받아와야함*/}
                            {/*<Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>*/}
                            {/*    <Page pageNumber={1}/>*/}
                            {/*</Document>*/}
                            <div className="image-text" onClick={detailHandler} id={item.score_no}>
                                곡명
                                <span className="score-title">{item.title}</span>
                                <div className="score-info"><span>자세히 보기</span></div>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
            {detailClick && <BoardDetail boardDetailInfo={boardDetailInfo} detailCloseHandler={detailCloseHandler}/>}
            {boardsLoading && <Skeleton variant="rectangular" width={1105} height={800}/>}
        </div>
    )
        ;
};

export default Board;