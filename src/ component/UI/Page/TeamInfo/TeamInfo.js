import './TeamInfo.scss';
import classNames from "classnames";
import React, { useState } from 'react';
import r from './img/r.png';
import b from './img/b.png';
import p1 from './img/p1.png';


const TeamInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    const [imageSize, setImageSize] = useState(100);
    const handleMouseEnter = () => {
        // 마우스가 이미지에 들어갈 때 크기 증가
        setImageSize(120); // 적절한 크기로 조절
    };

    const handleMouseLeave = () => {
        // 마우스가 이미지에서 나갈 때 크기 감소
        setImageSize(100); // 초기 크기로 조절
    };

    return (
        <header className="head1">
            <h1>
                Beethoven Tomato Deluxe
            </h1>
            <div className={`teaminfoContainer ${setAnimation}`}>
                <h2>
                    <p>팀 소개 페이지 입니다!</p>
                </h2>
                <div className="top">
                    <div className="box">
                        <div className="box-tool"
                             onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}  >
                            <br/>
                            <img src={p1} className="img3" alt="instruction1"/>
                        </div>
                        <h1 className="heading">PYTHON</h1>
                        <div className="data">
                            <span className="name">인공지능</span>
                        </div>
                        <p className="texts">
                            J
                        </p>
                    </div>
                    <div className="box">
                        <div className="box-tool">
                            <img src={b} className="img2" alt="instruction1"/>
                        </div>
                        <h1 className="heading">BACKEND</h1>
                        <div className="data">
                            <span className="name">on</span>
                        </div>
                        <p className="texts">
                            abc
                        </p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="box">
                        <div className="box-tool">
                            <img src={b} className="img2" alt="instruction1"/>
                        </div>
                        <h1 className="heading">BACKEND</h1>
                        <div className="data">
                            <span className="name">백엔드</span>
                        </div>
                        <p className="texts">
                            abc
                        </p>
                    </div>
                    <div className="box">
                        <div className="box-tool">
                            <img src={r} className="img1" alt="instruction1"/>
                        </div>
                        <h1 className="heading">REACT</h1>
                        <div className="data">
                            <span className="name">abc</span>
                        </div>
                        <p className="texts">
                            abc
                        </p>
                    </div>
                    <div className="box">
                        <div className="box-tool">
                            <img src={r} className="img1" alt="instruction1"/>
                        </div>
                        <h1 className="heading">REACT</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                            원용재
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default TeamInfo;
