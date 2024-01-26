import './TeamInfo.scss';
import classNames from "classnames";
import React, { useState } from 'react';
import r from './img/r.png';
import b from './img/b.png';
import p from './img/p.png';
import Swiper from "swiper";
import m12 from "../WebInfo/img/m12.png";

const TeamInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <header className="head1">
            <h1>
                Beethoven Tomato Deluxe
            </h1>
            <div className={`teaminfoContainer ${setAnimation}`}>
                <h2>
                   <p>팀 소개 페이지 입니다!</p>

                    음악을 더 풍부하게 즐기기 위해 음원을 악보로 변환하는 고급 음악 변환 사이트를 개발하는 팀입니다.<br/>
                </h2>
                <div className="top">
                    <div className="box">
                        <img src={r} className="img1" alt="instruction1" />
                        <h1 className="heading">Y.JAE!</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                        </p>
                    </div>
                    <div className="box">
                        <img src={r} className="img1" alt="instruction1" />
                        <h1 className="heading">Y.JAE!</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                        </p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="box">
                        <img src={r} className="img1" alt="instruction1" />
                        <h1 className="heading">Y.JAE!</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                        </p>
                    </div>
                    <div className="box">
                        <img src={r} className="img1" alt="instruction1" />
                        <h1 className="heading">Y.JAE!</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                        </p>
                    </div>
                    <div className="box">
                        <img src={r} className="img1" alt="instruction1" />
                        <h1 className="heading">Y.JAE!</h1>
                        <div className="data">
                            <span className="name">Won</span>
                        </div>
                        <p className="texts">
                        </p>
                    </div>
                </div>
            </div>
        </header>

    );
};
export default TeamInfo;
