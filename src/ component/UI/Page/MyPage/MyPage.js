import React from 'react';

import './MyPage.scss';
import classNames from "classnames";

const MyPage = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <div className={`mypageContainer ${setAnimation}`}>
            마이페이지 입니다.
        </div>
    );
};

export default MyPage;