import React, {useEffect, useState} from 'react';
import { GrClose } from "react-icons/gr";

import './Board_Detail.scss';

const  BoardDetail = ({ score_no, detailClose }) => {
    const [scoreInfo, setScoreInfo] = useState({
        scoreImgUrl: '',
        scoreTitle: '',
        // scoreUploadDateTime: '',
    });

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

    return (
        <div>
            <GrClose onClick={detailClose} style={{cursor:"pointer"}}/>
            곡명: {scoreInfo.scoreTitle}
            <img src={scoreInfo.scoreImgUrl} alt={scoreInfo.scoreTitle} />
            좋아요싫어요
        </div>
    );
};

export default BoardDetail;