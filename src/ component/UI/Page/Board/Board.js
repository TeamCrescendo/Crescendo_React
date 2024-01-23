import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import ImageMasonry from "../../board/board_list/ImageMansonry";
import PaginationRounded from "../../board/page_button/Page_Button";

const Board = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });


    return (
        <div className={`boardContainer ${setAnimation}`}>
            {ImageMasonry()}
            {PaginationRounded()}
        </div>
    );
};

export default Board;