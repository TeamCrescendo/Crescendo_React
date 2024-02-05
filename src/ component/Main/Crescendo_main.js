
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
                if (res.ok) {
                    return res.json();
                }
                else if (res.status === 400){
                    console.log("로그인체크 400error");
                }
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

    
    useEffect(() => {
        // URL 파라미터에서 액세스 토큰을 추출
        const searchParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = searchParams.get('access_token');

        // 액세스 토큰이 있는 경우 백엔드로 전송
        if (accessToken) {
            fetch('http://localhost:8484/api/auth/oauth2/google/info',{
                method: 'POST', // 요청 메서드
                headers: {
                'Content-Type': 'application/json' // 요청 헤더
                },
            body: JSON.stringify(accessToken) // 요청 본문
            }).then(res=>{
                if(res.status===200){
                    return res.json();
                }
            })
            .then(json=>{
      
                
            })

            LoginCheck();
        } else {
            return;
        }
    }, []);


    const googleLogin =  () => {
       // Google's OAuth 2.0 endpoint for requesting an access token
        const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        const params = {
            'client_id': '890304175366-cg7t8bjavr2dt1ttf4ma2atl077n8i4r.apps.googleusercontent.com',
            'redirect_uri': 'http://localhost:3000',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            'state': 'pass-through value'
        };
        const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

    // Redirect to Google OAuth 2.0 endpoint
        window.location.href = `${oauth2Endpoint}?${queryString}`;
      
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