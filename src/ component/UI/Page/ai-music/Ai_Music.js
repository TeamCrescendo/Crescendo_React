import React, {StrictMode, useState} from 'react';

import './Ai_Music.scss';
import classNames from "classnames";
import {getCurrentLoginUser} from "../../../util/login-util";
import Score from "../../conversion/score/Score";
import MusicApp from "./waveform/MusicApp";

const Ai_Music = ({ isForward }) => {
    const [scoreId, setScoreId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // ai 음악생성링크
    // http://localhost:8484/api/score/ai
    //     파라미터 형식
    // {
    //
    //     "prompt":"봄을 닮은 따뜻한 음악을 만들어줘",
    //     "duration":3
    // }
    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    const [audioUrl, setAudioUrl] = useState(null);
    const makeAiMusic = async (prompt, duration) => {
        try {
            const res = await fetch("http://localhost:8484/api/score/ai", {
                method: 'POST',
                headers: requestHeader,
                body: JSON.stringify({
                    prompt: prompt,
                    duration: duration
                })
            });

            if (res.ok) {
                // MP3 파일을 받기 위해 Blob 객체로 변환
                const blob = await res.blob();

                // Blob 객체를 이용하여 URL 생성
                const url = URL.createObjectURL(blob);

                // URL을 상태로 설정하여 자식 컴포넌트에게 전달
                setAudioUrl(url);
                setIsDone(true);
            } else {
                console.error("Failed to fetch MP3:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching MP3:", error);
        }
        setIsLoading(false);
    }

    const aiMusicMakeHanlder = e => {
        let promptValue = document.querySelector('.music_prompt').value;
        if (promptValue === null) promptValue = "무제";
        let durationValue = document.querySelector('.music_duration').value;
        if (durationValue === null) durationValue = 10;
        setIsLoading(true);
        setIsDone(false);
        makeAiMusic(promptValue, durationValue);
    }

    const loadingPage = () => {
        return (
            <>
                <div className="loading-container">
                    <span>프롬프트를 음악으로 변환중입니다...</span>
                    <img src="img/write.gif" alt="베토벤 로딩" />
                </div>
            </>
        )
    }

    const renderPage = () => {
        return (
            <>
                <span>프롬프트</span>
                <input className="music_prompt" type="text" placeholder="여기에 입력하세요."/>
                <span>초)음악 최대 길이 (10초)</span>
                <input className="music_duration" type="number" min="0" max="10" placeholder="재생시간"
                       style={{width: "100px"}}/>
                <button type="button" onClick={aiMusicMakeHanlder}>생성시작</button>
            </>
        );
    }

    return (
        <div className={`ai-music-container ${setAnimation}`}>
            <div className="ai-music-div">
                <h1>나만의 AI 음악</h1>

                {
                    isDone && <MusicApp url={audioUrl}/>
                }
                {
                    isLoading
                        ? loadingPage()
                        : renderPage()
                }
            </div>
        </div>
    );
};

export default Ai_Music;