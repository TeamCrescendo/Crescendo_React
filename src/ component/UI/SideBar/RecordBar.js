import React, { useState } from 'react';
import '../../Scss/RecordBar.scss';

const RecordBar = () => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleWheel = (event) => {
        if (!isAnimating) {
            setIsAnimating(true);

            // deltaY 값이 휠의 움직임 방향 및 양을 나타냅니다.
            const deltaY = event.deltaY;

            // 휠을 아래로 내리면 360도 회전 (한 바퀴)
            // 휠을 위로 올리면 360도 회전 (한 바퀴)
            setRotationAngle((prevAngle) => prevAngle + (deltaY > 0 ? 360 : -360));

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
