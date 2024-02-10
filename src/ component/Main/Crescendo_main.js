import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";
import './Crescendo_main.scss';
import MyPage from "../UI/Page/MyPage/MyPage";
import RecordBar from "../UI/RecordBar/RecordBar";
import TeamInfo from "../UI/Page/TeamInfo/TeamInfo";
import Ai_Music from "../UI/Page/ai-music/Ai_Music";
import Board from "../UI/Page/Board/Board";
import Session from "react-session-api/src";
import { AUTH_URL } from "../../config/host-config";
import { getCurrentLoginUser, TOKEN, USERNAME } from "../util/login-util";
import ConversionPage from "../UI/Page/Conversion/ConversionPage";
import { useNavigate, redirect } from 'react-router-dom';

const Crescendo_main = () => {

    const redirection = useNavigate();

    // 페이지 목차 인덱스
    const [pageId, setPageId] = useState(1);
    // 시계 방향이냐 반시계 방향이냐
    const [isForward, setIsForward] = useState(true);
    // 로그인 유저의 정보
    const [loginInfo, setLoginInfo] = useState();
    //구글 로그인 중이라는 상태변수
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);

    const [turn, setTurn] = useState(false);

    const pageGetter = (id, getIsForward) => {
        setPageId(parseInt(id, 10));
        console.log("이동한 페이지는: ", id);
        console.log("forward?: ", getIsForward);
        setIsForward(getIsForward);
    }

    const clickPageGetter = (id) => {
        console.log(id + "를 클릭함");
        // setPageId(parseInt(id, 10));
    }

    const renderPage = () => {
        switch (pageId) {
            case 1:
                return <ConversionPage isForward={isForward} LoginHandler={LoginHandler}
                                       loginInfo={loginInfo} googleLogin={googleLogin}
                                       LoginCheck={LoginCheck}
                                       logoutHandler={logoutHandler} />;
            case 2:
                return <Ai_Music isForward={isForward} LoginHandler={LoginHandler}
                                 loginInfo={loginInfo} LoginCheck={LoginCheck}
                                 googleLogin={googleLogin} logoutHandler={logoutHandler} />;
            case 3:
                return <Board isForward={isForward} LoginHandler={LoginHandler}
                              loginInfo={loginInfo} />;
            case 4:
                return <MyPage isForward={isForward} LoginHandler={LoginHandler}
                               loginInfo={loginInfo} googleLogin={googleLogin}
                               loginCheck={LoginCheck} pageGetter={pageGetter} clickPageGetter={clickPageGetter}
                               logoutHandler={logoutHandler} />;
            case 5:
                return <TeamInfo isForward={isForward} LoginHandler={LoginHandler}
                                 loginInfo={loginInfo} />;
            default:
                return null;
        }
    };

    const LoginHandler = (check) => {
        console.log("전달된 로그인 성공여부: ", check);
        // localStorage.setItem("isLoggedIn", Session.get("login"));
        // console.log("dto: ", );
    }

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const fetchLoginInfo = async () => {
        try {
            const res = await fetch("http://localhost:8484/api/member", {
                method: "GET",
                headers: requestHeader,
            });
            if (res.ok) {
                const json = await res.json();
                if (json != null) {
                    setLoginInfo(json);
                    console.log("로그인 검증 성공");
                    console.log(json);
                } else {
                    console.log("로그인 검증 실패");
                }
            } else if (res.status === 400) {
                console.log("로그인체크 400error");
            }
        } catch (error) {
            console.error("HTTP 요청 오류:", error);
        }
    };

    const LoginCheck = () => {
        if (token === null) {
            return;
        }
        console.log("로그인체크");
        fetchLoginInfo();
    };

    const logoutHandler = async () => {
        localStorage.clear();
        setLoginInfo(undefined);
        setToken(null);
        // window.location.reload();
    };

    const test = async () => {
        if (localStorage.getItem("Google") !== "ok") {
            return;
        }
        const searchParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = searchParams.get('access_token');
        if (accessToken) {
            try {
                const res = await fetch('http://localhost:8484/api/auth/oauth2/google/info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accessToken)
                });
                if (res.status === 200) {
                    const json = await res.json();
                    const newToken = json.token;
                    const userName = json.userName;
                    localStorage.setItem(TOKEN, json.token);
                    localStorage.setItem(USERNAME, json.userName);
                    localStorage.setItem("Google", "no");
                    setIsGoogleLogin(true);
                    redirection('/');
                    setToken(newToken);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        test();
    }, []);

    useEffect(() => {
        if (token !== null) {
            LoginCheck();
        }
    }, [token, isGoogleLogin]);

    const googleLogin = () => {
        const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        const params = {
            'client_id': '890304175366-cg7t8bjavr2dt1ttf4ma2atl077n8i4r.apps.googleusercontent.com',
            'redirect_uri': 'http://localhost:3000',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            'state': 'pass-through value'
        };
        const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

        localStorage.setItem("Google", "ok");
        window.location.href = `${oauth2Endpoint}?${queryString}`;
    }

    return (
        <>
            <RecordBar pageGetter={pageGetter} clickPageGetter={clickPageGetter} />
            <div className='CrescendoMain'>
                {renderPage()}
            </div>
            <div className="custom-bg"><img src="/img/scoreBG.jpg" alt="bg" /></div>
        </>
    );
};

export default Crescendo_main;
