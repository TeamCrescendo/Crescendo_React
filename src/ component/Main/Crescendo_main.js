import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";
import './Crescendo_main.scss';
import MyPage from "../UI/Page/MyPage/MyPage";
import RecordBar from "../UI/RecordBar/RecordBar";
import TeamInfo from "../UI/Page/TeamInfo/TeamInfo";
import Ai_Music from "../UI/Page/ai-music/Ai_Music";
import Board from "../UI/Page/Board/Board";
import Session from "react-session-api/src";
import {API_BASE_URL, AUTH_URL, MEMBER_URL} from "../../config/host-config";
import { getCurrentLoginUser, TOKEN, USERNAME } from "../util/login-util";
import ConversionPage from "../UI/Page/Conversion/ConversionPage";
import { useNavigate, redirect } from 'react-router-dom';
import classNames from "classnames";

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
        setIsForward(getIsForward);
    }

    const clickPageGetter = (id) => {
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
                              loginInfo={loginInfo} LoginCheck={LoginCheck}
                              googleLogin={googleLogin} logoutHandler={logoutHandler} />;
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
            const res = await fetch(MEMBER_URL, {
                method: "GET",
                headers: requestHeader,
            });
            if (res.ok) {
                const json = await res.json();
                if (json != null) {
                    setLoginInfo(json);
                }
            } else {
                await logoutHandler();
            }
        } catch (error) {
        }
    };

    const LoginCheck = () => {
        if (token === null) {
            return;
        }
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
                const res = await fetch(AUTH_URL + '/oauth2/google/info', {
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
            'redirect_uri': API_BASE_URL,
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            'state': 'pass-through value'
        };
        const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

        localStorage.setItem("Google", "ok");
        window.location.href = `${oauth2Endpoint}?${queryString}`;
    }


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });
    const bgSetter = () => {
        switch (pageId) {
            case 1:
                return (
                    <>
                         <div className="custom-bg"><img src="/img/scoreBG.jpg" alt="bg" /></div>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="custom-bg"><img src="/img/aibg1.jpg" alt="bg" /></div>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="custom-bg"><img src="/img/scoreBG.jpg" alt="bg" /></div>
                    </>
                )
            case 4:
                return (
                    <>
                        <div className="custom-bg"><img src="/img/scoreBG.jpg" alt="bg" /></div>
                    </>
                )
            case 5:
                return (
                    <>
                        <div className="custom-bg"><img src="/img/scoreBG.jpg" alt="bg" /></div>
                    </>
                )
        }
    }

    return (
        <>
            <RecordBar pageGetter={pageGetter} clickPageGetter={clickPageGetter} />
            <div className='CrescendoMain'>
                {renderPage()}
            </div>
            {bgSetter()}
        </>
    );
};

export default Crescendo_main;
