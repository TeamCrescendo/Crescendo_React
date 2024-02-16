import React, {useEffect, useState} from 'react';
import './RecordBar.scss';
import PageIndex from "./page-index/Page_Index";

const RecordBar = ({ pageGetter, clickPageGetter }) => {
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
                    pageGetter(pageId + 1, true);
                }
                if (pageId === 5) {
                    setRotationAngle((prevAngle) => prevAngle + 360);
                    setPageId((prevPageId) => prevPageId - 4);
                    pageGetter(1, true);
                }
            } else {
                if (pageId > 1 && pageId < 6) {
                    setRotationAngle((prevAngle) => prevAngle - 360);
                    setPageId((prevPageId) => prevPageId - 1);
                    pageGetter(pageId - 1, false);
                }
                if (pageId === 1) {
                    setRotationAngle((prevAngle) => prevAngle - 360);
                    setPageId((prevPageId) => prevPageId + 4);
                    pageGetter(5, false);
                }
            }
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        }
    };
    const handleWheel2 = (event, id) => {
        if (id !== pageId) {

            // setIsAnimating(true);
            const deltaY = event.deltaY;
            // 휠을 아래로 내리면 360도 회전 (한 바퀴)
            // 휠을 위로 올리면 360도 회전 (한 바퀴)
            // setRotationAngle((prevAngle) => prevAngle + (deltaY > 0 ? 360 : -360));
            if (deltaY > 0) {
                setRotationAngle((prevAngle) => prevAngle + 360);
                pageGetter(id, true);
            } else {
                setRotationAngle((prevAngle) => prevAngle - 360);
                pageGetter(id, false);
            }
            // setTimeout(() => {
            //     setIsAnimating(false);
            // }, 1000);
        }
    };

    const indexClickPageId = (id) => {
        setPageId(parseInt(id, 10));
        handleWheel2({ deltaY: parseInt(id, 10) > pageId ? 1 : -1 }, parseInt(id, 10));
    }


    return (
        <div className="RecordBarDiv" onWheel={handleWheel}>
            <PageIndex pageId={pageId} clickPageGetter={clickPageGetter}
                       indexClickPageId={indexClickPageId}/>
            <img
                className="RecordBarIMG"
                alt="LP판 이미지"
                src="img/recordCD.png"
                style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 1s' }}
            />
        </div>
    );
};

export default RecordBar;
