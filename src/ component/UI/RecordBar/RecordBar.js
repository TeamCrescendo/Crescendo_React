import React, {useEffect, useState} from 'react';
import './RecordBar.scss';

const RecordBar = ({ pageGetter }) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    let [pageId, setPageId] = useState(1);

    const handleWheel = (event) => {
        if (!isAnimating) {
            setIsAnimating(true);
            const deltaY = event.deltaY;
            // 휠을 아래로 내리면 360도 회전 (한 바퀴)
            // 휠을 위로 올리면 360도 회전 (한 바퀴)
            // setRotationAngle((prevAngle) => prevAngle + (deltaY > 0 ? 360 : -360));
            if (deltaY > 0) {
                if (pageId >= 1 && pageId < 5) {
                    setRotationAngle((prevAngle) => prevAngle + 360);
                    setPageId((prevPageId) => prevPageId + 1);
                    console.log("다음 페이지");
                    pageGetter(pageId + 1);
                }
            } else {
                if (pageId > 1 && pageId < 6) {
                    setRotationAngle((prevAngle) => prevAngle - 360);
                    setPageId((prevPageId) => prevPageId - 1);
                    console.log("이전 페이지");
                    pageGetter(pageId - 1);
                }
            }
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);


        }
    };


    return (
        <div className="RecordBarDiv">
            <img
                className="RecordBarIMG"
                alt="LP판 이미지"
                src="img/recordCD.png"
                style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 1s' }}
                onWheel={handleWheel}
            />
        </div>
    );
};

export default RecordBar;
