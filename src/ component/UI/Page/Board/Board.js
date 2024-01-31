import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {ImageList, ImageListItem, Skeleton} from "@mui/material";
import {getCurrentLoginUser} from "../../../util/login-util";
import {Document, Page} from "react-pdf";

const Board = ({ isForward }) => {
    const [scoreDetailOpen ,setScoreDetailOpen] = useState(false);
    const [scoreId, setScoreId] = useState(null);
    const [boards, setBoards] = useState([]);
    // 보드 로딩 참 거짓
    const [boardsLoading, setBoardsLoading] = useState(false);

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);

    // 보드 정보 가져오기
    useEffect( async() => {
        const res =   await fetch("http://localhost:8484/api/board/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json =  await res.json();
        setBoards([...json.boards]);
        console.log(boards)
    }, []);

    // 보드 배열 받아오면 실행하는 effect
    useEffect(() => {
        console.log(boards)
        if(boards.length !==0){
            setBoards(true);
        }
    }, [boards]);



    const itemData = [
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Fern',
            score_no: 1,
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Snacks',
            score_no: 2,
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Mushrooms',
            score_no: 3,
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Tower',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Sea star',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Honey',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Basketball',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Breakfast',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Tree',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Burger',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Camera',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Camping Car',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Hats',
        },
        {
            img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
            title: 'Tomato basil',
        },
    ];

    const detailHandler = (e) => {

    }

    // PDF파일 잘 불러오면 하는 함수
    const onDocumentLoadSuccess = () =>{

    }

    return (
        <div className={`boardContainer ${setAnimation}`}>
            {!boardsLoading?
            <ImageList sx={{width:1105, height:800, p:2}} cols = {2} rowHeight={800}
                       gap={25}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} className="image-list-item" sx={{
                        border:1,
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
                        <div className="image-text" onClick={detailHandler}  id={item.score_no}>
                            곡명
                            <span className="score-title">{item.title}</span>
                            <div className="score-info"><span>자세히 보기</span></div>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
                :
                <Skeleton variant="rectangular" width={1105} height={800} />
            }
        </div>
    );
};

export default Board;