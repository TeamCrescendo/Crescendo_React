import './TeamInfo.scss';
import classNames from "classnames";
import React, { useState } from 'react';
import r from './img/r.png';
import b from './img/b.png';
import p from './img/p.png';


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
                </h2>
                <div className="top">
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
                    <div className="box">
                        <div className="box-tool">
                            <img src={b} className="img1" alt="instruction1"/>
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
                        <img src={r} className="img1" alt="instruction1"/>
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
