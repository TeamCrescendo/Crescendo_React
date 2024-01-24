import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

import './ImageMansonry.scss';
import PaginationRounded from '../page_button/Page_Button';
import {useState} from "react";

const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}));

function ImageMasonry({ renderBoardPage }) {

    const detailHandler = e => {
        const score_no = e.target.id;
        renderBoardPage(score_no);
    }

    return (
        <Box className="box" sx={{ width: 800, minHeight: 700 }}>
            <Masonry columns={3} spacing={2}>
                {itemData.map((item, index) => (
                    <div key={index}>
                        <Label>{index + 1}</Label>
                        <div className="image-container">
                            <img
                                className="score-img"
                                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=162&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                    display: 'block',
                                    width: '100%',
                                }}
                            />
                            <div className="image-text" onClick={detailHandler} id={item.score_no}>
                                곡명
                                <span className="score-title">{item.title}</span>
                                <div className="score-info">
                                    <span>자세히 보기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>
        </Box>
    );
}
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

export default ImageMasonry;