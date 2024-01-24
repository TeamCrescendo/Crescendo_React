import * as React from 'react';
import './Board.scss';
import classNames from "classnames";
import ImageMasonry from "../../board/board_list/ImageMansonry";
import PaginationRounded from "../../board/page_button/Page_Button";
import {useState} from "react";
import BoardDetail from "./board_detail/Board_Detail";

const Board = ({ isForward }) => {
    const [scoreDetailOpen ,setScoreDetailOpen] = useState(false);
    const [scoreId, setScoreId] = useState(null);

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });
    const detailClose = () => {
        setScoreDetailOpen(false);
    }

    const renderBoardPage = (score_no) => {
        // console.log(score_no);
        setScoreDetailOpen(true);
        setScoreId(score_no);
    }
    const renderBoardDetail = () => {
        return (
          <>
            <BoardDetail score_no={scoreId} detailClose={detailClose}/>
          </>
        );
    }
    const renderBoardList = () => {
        return (
          <>
              <ImageMasonry renderBoardPage={renderBoardPage}/>
              {PaginationRounded()}
          </>
        );
    }


    return (
        <div className={`boardContainer ${setAnimation}`}>
            {
                scoreDetailOpen
                ? renderBoardDetail()
                : renderBoardList()
            }

        </div>
    );
};

export default Board;