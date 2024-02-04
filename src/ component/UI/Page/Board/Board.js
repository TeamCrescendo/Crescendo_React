import React from 'react';
import './Board.scss';
import classNames from "classnames";
import axios from 'axios';
import { FaFileUpload } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
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
                    <div className="body-div">
                        <article className="article-01">
                            <div className="cont1">
                                <h2>AUDIO</h2>
                                <div className="cont2">
                                    <time className="time">February 02 , 2024</time>
                                </div>
                                <audio className="audio" controls="controls">
                                    <source type="audio/mpeg"
                                            src="http://media.blubrry.com/codepen_
                                        radio/p/codepen-podcast.s3.amazonaws.com/100.mp3?_=1"
                                    />
                                </audio>
                            </div>
                        </article>
                    </div>
                </div>
            </header>
        </>

    );
};

export default Board;
