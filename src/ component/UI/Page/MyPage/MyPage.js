import React, { useState, useRef } from 'react';
import './MyPage.scss';
import classNames from "classnames";

const MyPage = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <div className={`mypageContainer ${setAnimation}`}>
            <>
                <div className="todo">
                    <h1>MY PAGE</h1>
                    <p className="sub">
                        악보 변환, 나만의 음악 작품을 완성해 봅니다.
                    </p>
                </div>
                <div className="tab-container">
                    <div className="tabdiv1">
                        <h2>Small circuitry</h2>
                        <ul>
                            <li>Headphones</li>
                            <li>Wristwatch</li>
                            <li>Guitar effect pedal</li>
                        </ul>
                    </div>
                    <div className="tabdiv2">
                        <h2>Small circuitry</h2>
                        <ul>
                            <li>Headphones</li>
                            <li>Wristwatch</li>
                            <li>Guitar effect pedal</li>
                        </ul>
                    </div>
                    <div className="tabdiv3">
                        <h2>Small circuitry</h2>
                        <ul>
                            <li>Headphones</li>
                            <li>Wristwatch</li>
                            <li>Guitar effect pedal</li>
                        </ul>
                    </div>
                </div>
            </>
        </div>
    );
};

export default MyPage;