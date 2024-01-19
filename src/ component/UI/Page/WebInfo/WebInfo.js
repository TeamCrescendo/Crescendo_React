import React from 'react';

import './WebInfo.scss';
import classNames from "classnames";

const WebInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <header className="head2">
            <h1>
                This is the site introduction page
            </h1>
            <div className={`webinfoContainer ${setAnimation}`}>
                사이트 소개 페이지 입니다
            </div>
        </header>

    );
};

export default WebInfo;