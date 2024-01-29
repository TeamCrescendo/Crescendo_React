import React from 'react';

import './Board.scss';
import classNames from "classnames";

const Board = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <>
            <header className="hhh1">
                <h1>
                    Bulletin Board
                </h1>
                <div className={`boardContainer ${setAnimation}`}>
                </div>
            </header>

        </>

    );
};

export default Board;