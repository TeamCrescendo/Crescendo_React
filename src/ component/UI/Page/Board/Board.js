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