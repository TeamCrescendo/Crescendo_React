
import React, {useEffect, useState} from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

import './Crescendo_main.scss';
import MyPage from "../UI/Page/MyPage/MyPage";
import RecordBar from "../UI/RecordBar/RecordBar";
import TeamInfo from "../UI/Page/TeamInfo/TeamInfo";
import Ai_Music from "../UI/Page/ai-music/Ai_Music";
import Board from "../UI/Page/Board/Board";
import Session from "react-session-api/src";
import {AUTH_URL} from "../../config/host-config";
import {getCurrentLoginUser} from "../util/login-util";
import ConversionPage from "../UI/Page/Conversion/ConversionPage";

const Crescendo_main = () => {
    // 페이지 목차 인덱스
    const [pageId, setPageId] = useState(1);
    // 시계 방향이냐 반시계 방향이냐
    const [isForward, setIsForward] = useState(true);
    // 로그인 유저의 정보
    const [loginInfo, setLoginInfo] = useState();


    const pageGetter = (id, getIsForward) => {
        setPageId(parseInt(id, 10));
        console.log("이동한 페이지는: ", id);
        console.log("forward?: ", getIsForward);
        setIsForward(getIsForward);
    }

    const clickPageGetter = (id) =>  {
        console.log(id + "를 클릭함");
        // setPageId(parseInt(id, 10));
    }



    const renderPage = () => {
        switch (pageId) {
            case 1:
                return <ConversionPage isForward={isForward} LoginHandler={LoginHandler}
                                   loginInfo={loginInfo} googleLogin={googleLogin}
                                   LoginCheck={LoginCheck}
                                   logoutHandler={logoutHandler}/>;
            case 2:
                return <Ai_Music isForward={isForward} LoginHandler={LoginHandler}
                                 loginInfo={loginInfo}/>;
            case 3:
                return <Board isForward={isForward} LoginHandler={LoginHandler}
                              loginInfo={loginInfo}/>;
            case 4:

                return <MyPage isForward={isForward} LoginHandler={LoginHandler}
                               loginInfo={loginInfo} googleLogin={googleLogin}
                               loginCheck={LoginCheck}
                               logoutHandler={logoutHandler}/>;
            case 5:
                return <TeamInfo isForward={isForward} LoginHandler={LoginHandler}
                                 loginInfo={loginInfo}/>;
            default:
        }
    };

    const LoginHandler = (check) => {
        console.log("전달된 로그인 성공여부: ", check);
        // localStorage.setItem("isLoggedIn", Session.get("login"));
        // console.log("dto: ", );
    }

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    const LoginCheck = () => {
        if (token === null) {
            return;
        }
        console.log("로그인체크");
        fetch("http://localhost:8484/api/member", {
            method: "GET",
            headers: requestHeader,
        })
            .then(res => {
                if (res.status === 200) return res.json();
                else if (res.status === 400) console.log("로그인체크 400error");
            })
            .then(json => {
                if (json != null) {
                    // setIsLogin(true);
                    setLoginInfo(json);
                    console.log("로그인 검증 성공");
                    console.log(json);
                } else {
                    console.log("로그인 검증 실패");
                }
            })
            .catch(error => {
                console.error("JSON 파싱 오류:", error);
            });
    }

    // const logoutHandler = () => {
    //     setIsLogin(false);
    //     document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    //     console.log("로그아웃 시도");
    //
    //
    // }
    const logoutHandler = async () => {
        localStorage.clear();
        setLoginInfo(undefined);
        setToken(null);
        // window.location.reload();
    };

    const googleLogin = () => {
        fetch("http://localhost:8484/api/auth/oauth2/google", {
            method: 'GET',
        })
            .then(res => {
                if (res.status === 200) alert("구글로그인!");
            })
    }


    useEffect(() => {
        // LoginCheck();
    }, []);

    return (
        <>
            <RecordBar pageGetter={pageGetter} clickPageGetter={clickPageGetter}/>
            <div className='CrescendoMain'>
                {renderPage()}
            </div>
        </>
    );
};

export default Crescendo_main;