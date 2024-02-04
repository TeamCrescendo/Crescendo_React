import React, {StrictMode, useState} from 'react';
import './Ai_Music.scss';
import classNames from "classnames";
import {getCurrentLoginUser} from "../../../util/login-util";
import Score from "../../conversion/score/Score";
import MusicApp from "./waveform/MusicApp";
import {Slider} from "@mui/material";

import Textarea from '@mui/joy/Textarea';
import {Typography} from "@mui/joy";
const Ai_Music = ({ isForward, loginInfo }) => {
    const [scoreId, setScoreId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [sliderValue, setSliderValue] = useState(5);
    const [text, setText] = React.useState('');

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
        if (text === '') setText("무제");
        setIsLoading(true);

        setIsDone(false);
        makeAiMusic(text, sliderValue);
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

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue); // Slider 값 변경 시 상태 업데이트
    };

    const renderPage = () => {
        return (
            <>
                {/*<span>프롬프트</span>*/}
                <span>음악 길이 설정</span>
                <Slider
                    className="music_duration"
                    aria-label="time"
                    defaultValue={5}
                    // getAriaValueText={valuetext}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
                <Textarea
                    className="music_prompt"
                    placeholder="원하는 음악을 설명해주세요."
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    minRows={5}
                    maxRows={7}
                    endDecorator={
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                            {text.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 500 }}
                />

                {/*<input className="music_duration" type="number" min="0" max="10" placeholder="재생시간"*/}
                {/*       style={{width: "100px"}}/>*/}
                <button type="button" onClick={aiMusicMakeHanlder}>생성시작</button>
            </>
        );
    }

    const backHandler = () => {
        setIsDone(false);

    }

    return (
        <div className={`ai-music-container ${setAnimation}`}>
            <div className="ai-music-header">
                <h1>나만의 AI 음악</h1>
            </div>
            <div className="ai-music-div">

                {
                    isDone &&
                    (
                        <>
                            <MusicApp url={audioUrl}/>
                            <div className="btn-container">
                                <div className="returnBtn" onClick={backHandler}>돌아가기</div>
                                <a href={audioUrl} download={`${loginInfo.userName + "의 음악"}.mp3`} className="downloadBtn">
                                    다운로드
                                </a>
                            </div>
                        </>
                    )
                }
                {
                    isLoading
                        ? loadingPage()
                        : !isDone && renderPage()
                }
            </div>
        </div>
    );
};

export default Ai_Music;