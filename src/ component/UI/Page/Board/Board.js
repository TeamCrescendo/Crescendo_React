import React, {useRef, useState} from 'react';
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
    const [content, setContent] = useState("");
    const handleContentChange = (e) => {
        setContent(e.target.value); // textarea의 값이 변경될 때마다 state 업데이트
    };
    // PDF 파일 업로드 관련 함수
    // PDF 파일 업로드 관련 함수
    const handlePdfUpload = async (event) => {
        const pdfFile = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('pdfFile', pdfFile);

            const uploadResponse = await axios.post('/api/upload/pdf', formData); // axios 사용
            console.log('======= PDF 파일 업로드 성공 =======');
            console.log(uploadResponse.data);

            // 여기에서 필요한 처리를 추가할 수 있습니다.

        } catch (uploadError) {
            console.log('======= PDF 파일 업로드 실패 =======');
            console.log(uploadError);
        }
    };
    return (
        <>
            <header className="hhh1">
                <h1>
                    Bulletin Board
                </h1>
                <div className={`boardContainer ${setAnimation}`}>
                    <div className="box2">
                        <span className="imog2"><IoCloseCircleOutline /></span>
                        <p className="texts2">
                            자유롭게 적어 주세요!

                        </p>

                        <div className="boot-strap2">
                            <hr/>
                            <input
                                type="text"
                                className="content2"
                                placeholder="음악 혹은 악보관련 이야기를 작성해주세요!"
                                value={content}
                                onChange={handleContentChange}
                            />
                        </div>
                        <div className="title2">
                        </div>
                        <div className="heading2">
                            <input
                                className="upload2"
                                type="file"
                                onChange={handlePdfUpload}
                                accept=".pdf"
                            />
                            <p><FaFileUpload /> 파일을 업로드 하세요!</p>
                            <button className="button2">UPLOAD</button>
                        </div>

                    </div>
                </div>
            </header>
        </>

    );
};

export default Board;