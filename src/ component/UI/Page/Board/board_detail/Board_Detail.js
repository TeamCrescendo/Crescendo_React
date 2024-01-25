import React, {useEffect, useState} from 'react';
import { GrClose } from "react-icons/gr";
import {AiFillDislike, AiFillLike} from "react-icons/ai";

import './Board_Detail.scss';
import {FaHeart, FaRegHeart} from "react-icons/fa6";
import {BsHeartbreak, BsHeartbreakFill} from "react-icons/bs";
import {GiSaveArrow} from "react-icons/gi";
import {MdFormatListBulletedAdd} from "react-icons/md";

const  BoardDetail = ({ score_no, detailClose }) => {
    const [scoreInfo, setScoreInfo] = useState({
        scoreImgUrl: '',
        scoreTitle: '',
        // scoreUploadDateTime: '',
    });
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    // DB 쓰기전에 임시 사용
    const getScoreInfo = () => {
        const itemData = [
            {
                img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
                title: 'Fern',
                iscore_no: 1,
            },
            {
                img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
                title: 'Snacks',
                iscore_no: 2,
            },
            {
                img: 'https://cdn.mapianist.com/preview-v2/0a0494b7-1db8-44b1-a0a1-175d076bd400-1675072813.jpg',
                title: 'Mushrooms',
                iscore_no: 3,
            },
        ];

        let foundItem;
        for (const item of itemData) {
            if (parseInt(item.iscore_no) === parseInt(score_no)) {
                foundItem = item;
            }
        }

        if (foundItem) {
            setScoreInfo({
                ...scoreInfo,
                scoreImgUrl: foundItem.img,
                scoreTitle: foundItem.title
            });
        }
    };

    useEffect(() => {
        getScoreInfo();
    }, []);

    const likeClickHandler = () => {
        setLikeClicked(!likeClicked);
    }
    const dislikeClickHandler = () => {
        setDislikeClicked(!dislikeClicked);

    }

    // 이미지 우클릭 금지
    document.querySelector('.detail-img').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    return (
        <div className="board-detail-container">
            <div className="detail-header">
                <GrClose className="close" onClick={detailClose} style={{cursor:"pointer"}}/>
            </div>

            <div className="detail-title">
                <span className="subTitle">곡명</span>
                <span className="mainTitle">[ {scoreInfo.scoreTitle} ]</span>
            </div>

            <div className="img-container">
                <img className="detail-img" src={scoreInfo.scoreImgUrl} alt={scoreInfo.scoreTitle} />
                <div className="detail-side">
                    {
                        likeClicked
                        ? <FaHeart className="like-btn" onClick={likeClickHandler} style={{cursor:"pointer", color:"red"}}/>
                        : <FaRegHeart className="like-btn"  onClick={likeClickHandler} style={{cursor:"pointer"}}/>
                    }
                    {
                        dislikeClicked
                        ? <BsHeartbreakFill className="dislike-btn"  onClick={dislikeClickHandler} style={{cursor:"pointer", color:"purple"}}/>
                        : <BsHeartbreak className="dislike-btn"  onClick={dislikeClickHandler} style={{cursor:"pointer"}}/>
                    }
                    <MdFormatListBulletedAdd style={{cursor:"pointer"}}/>
                    <GiSaveArrow className="download-btn" style={{cursor:"pointer"}}/>

                </div>
            </div>
        </div>
    );
};

export default BoardDetail;