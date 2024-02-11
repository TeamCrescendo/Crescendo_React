import React, {StrictMode, useState} from 'react';
import './Ai_Music.scss';
import classNames from "classnames";
import {getCurrentLoginUser} from "../../../util/login-util";
import Score from "../../conversion/score/Score";
import MusicApp from "./waveform/MusicApp";
import {Slider} from "@mui/material";

import Textarea from '@mui/joy/Textarea';
import {Typography} from "@mui/joy";
import PromptInfo from "./prompt_info/Prompt_Info";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserInfomation from "../../login_info/User_Infomation";


const Ai_Music = ({ isForward, loginInfo, googleLogin, logoutHandler, LoginCheck }) => {
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
        LoginCheck();
    }

    const aiMusicMakeHanlder = e => {
        if (text.length < 3) {
            alert("3글자 이상 작성해주세요!");
            return;
        }
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
                <div className="ai-music-header">
                    <h1 style={{fontSize: "60px"}}>AI 음악 생성하기</h1>
                </div>
                <div className="ai-music-div">
                    <div className="set-duration">
                        <span className="duration-text">음악 길이 설정</span>
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
                    </div>
                    <Textarea
                        className="music_prompt"
                        placeholder="원하는 음악을 설명해주세요. (3글자 이상)"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        minRows={5}
                        maxRows={5}
                        endDecorator={
                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                {text.length} 글자
                            </Typography>
                        }
                        sx={{ minWidth: 500 }}
                    />

                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={aiMusicMakeHanlder}>
                        생성하기
                    </Button>
                </div>
            </>
        );
    }

    const backHandler = () => {
        setIsDone(false);
        setText("");
    }

    return (
        <div className={`ai-music-container ${setAnimation}`}>
            <div className="head">
                <UserInfomation googleLogin={googleLogin} logoutHandler={logoutHandler} loginInfo={loginInfo}/>
            </div>
                {
                    isDone &&
                    (
                        <>
                            <MusicApp url={audioUrl}/>
                            <PromptInfo text={text}/>
                            <div className="btn-container">
                                <Button variant="contained" color="success" style={{background:"deepskyblue", marginRight:"10px"}}>
                                    <div className="returnBtn" onClick={backHandler}>돌아가기</div>
                                </Button>

                                <Button variant="contained" color="success" style={{background:"green", marginLeft:"10px"}}>
                                    <a href={audioUrl} download={`${loginInfo.userName + "의 음악"}.mp3`} className="downloadBtn">
                                        다운로드
                                    </a>
                                </Button>
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
    );
};

export default Ai_Music;