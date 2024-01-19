import React from 'react';

import './Board.scss';
import classNames from "classnames";

const Board = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <div className={`boardContainer ${setAnimation}`}>
            게시물 페이지 입니다.
        </div>
    );
};

export default Board;