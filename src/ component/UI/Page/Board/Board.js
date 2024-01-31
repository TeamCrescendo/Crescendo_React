import React, {useState} from 'react';
import './Board.scss';
import classNames from "classnames";
import { IoMdCloseCircle } from "react-icons/io";
import r from "../TeamInfo/img/r.png";

const Board = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });
    const [content, setContent] = useState("");
    const handleContentChange = (e) => {
        setContent(e.target.value); // textarea의 값이 변경될 때마다 state 업데이트
    };

    return (
        <>
            <header className="hhh1">
                <h1>
                    Bulletin Board
                </h1>
                <div className={`boardContainer ${setAnimation}`}>
                    <div className="box2">
                        <p className="texts2">
                            자유롭게 적어 주세요!
                        </p>
                        <div className="boot-strap2">
                            <hr/>
                        </div>
                        <div className="title2">
                            <input
                                type="text"
                                className="content2"
                                placeholder="음악 혹은 악보관련 이야기를 작성해주세요!"
                                value={content}
                                onChange={handleContentChange}
                            />
                        </div>
                        <div className="heading2">
                            upload
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
};

export default Board;