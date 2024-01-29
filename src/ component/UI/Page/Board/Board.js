import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import {useState} from "react";
import {ImageList, ImageListItem} from "@mui/material";

const Board = ({ isForward }) => {
    const [scoreDetailOpen ,setScoreDetailOpen] = useState(false);
    const [scoreId, setScoreId] = useState(null);

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });
    

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

    return (
        <div className={`boardContainer ${setAnimation}`}>
            <ImageList sx={{width:800, height:600}} cols = {3} rowHeight={400} gap={10}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} className="image-list-item" sx={{
                        border:1,
                        borderColor: 'primary.main',
                        // m:0.5
                        // gap: 3
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
                        <div className="image-text" onClick={detailHandler}  id={item.score_no}>
                            곡명
                            <span className="score-title">{item.title}</span>
                            <div className="score-info"><span>자세히 보기</span></div>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default Board;