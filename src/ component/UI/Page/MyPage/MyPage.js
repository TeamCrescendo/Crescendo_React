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

        </div>
    );
};

export default MyPage;