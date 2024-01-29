import React, {useState} from 'react';

import './Ai_Music.scss';
import classNames from "classnames";
import {getCurrentLoginUser} from "../../../util/login-util";

const Ai_Music = ({ isForward }) => {
    const [prompt, setPrompt] = useState("");
    const [duration, setDuration] = useState(10);

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
    const makeAiMusic = () => {
        fetch("http://localhost:8484/api/score/ai", {
            method: 'POST',
            header: requestHeader,
            body: JSON.stringify({  // 요청 본문을 JSON 문자열로 변환
                prompt: prompt,
                duration: duration
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json(); // JSON 데이터를 파싱하여 사용할 수 있도록 처리
                }
            })
            .then(data => {
                console.log("idvalue=", data); // 응답 데이터를 처리
            })
            .catch(error => {
                console.error('Error:', error); // 에러 처리
            });
    }

    const aiMusicMakeHanlder = e => {
        setPrompt(document.querySelector('.music_prompt').value);
        setDuration(document.querySelector('.music_duration').value);
        makeAiMusic();
    }

    return (
        <div className={`ai-music-container ${setAnimation}`}>
            <div className="ai-music-div">
                <span>프롬프트</span>
                <input className="music_prompt" type="text" placeholder="여기에 입력하세요." />
                <span>초)음악 최대 길이 (10초)</span>
                <input className="music_duration" type="number" min="0" max="10" placeholder="재생시간" style={{width:"100px"}}/>
                <button type="button" onClick={aiMusicMakeHanlder}>생성시작</button>
            </div>

            <audio controls>
                <source src="" type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default Ai_Music;