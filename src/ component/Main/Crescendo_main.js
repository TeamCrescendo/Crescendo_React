
import React, {useEffect, useState} from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

import './Crescendo_main.scss';
import Conversion from "../UI/Page/Conversion/Conversion";
import MyPage from "../UI/Page/MyPage/MyPage";
import RecordBar from "../UI/RecordBar/RecordBar";
import TeamInfo from "../UI/Page/TeamInfo/TeamInfo";
import WebInfo from "../UI/Page/WebInfo/WebInfo";
import Board from "../UI/Page/Board/Board";
import Session from "react-session-api/src";

const Crescendo_main = () => {
    const [pageId, setPageId] = useState(1);
    const [isForward, setIsForward] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [loginInfo, setLoginInfo] = useState();


    const pageGetter = (id, getIsForward) => {
        console.log("이동한 페이지는: ", id);
        console.log("forward?: ", getIsForward);
        setPageId(id);
        setIsForward(getIsForward);
    }
    const renderPage = () => {
        switch (pageId) {
            case 1:
                return <Conversion isForward={isForward} LoginHandler={LoginHandler}
                                   isLogin={isLogin} loginInfo={loginInfo}
                                   loginSessionCheck={LoginSessionCheck}
                                   logoutHandler={logoutHandler}/>;
            case 2:
                return <MyPage isForward={isForward} LoginHandler={LoginHandler}
                               isLogin={isLogin} loginInfo={loginInfo}/>;
            case 3:
                return <Board isForward={isForward} LoginHandler={LoginHandler}
                              isLogin={isLogin} loginInfo={loginInfo}/>;
            case 4:
                return <WebInfo isForward={isForward} LoginHandler={LoginHandler}
                                isLogin={isLogin} loginInfo={loginInfo}/>;
            case 5:
                return <TeamInfo isForward={isForward} LoginHandler={LoginHandler}
                                 isLogin={isLogin} loginInfo={loginInfo}/>;
            default:
        }
    };

    const LoginHandler = (check) => {
        console.log("전달된 로그인 성공여부: ", check);
        // localStorage.setItem("isLoggedIn", Session.get("login"));
        setIsLogin(check);
        // console.log("dto: ", );
    }

    const LoginSessionCheck = () => {
        fetch("http://localhost:8484/api/auth/compare", {
            method: "GET",
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                if (json != null) {
                    setIsLogin(true);
                    setLoginInfo(json);
                    console.log("로그인 검증 성공");
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
        try {
            const response = await fetch('http://localhost:8484/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsLogin(false);
            } else {
                console.error('로그아웃 실패');
            }
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    useEffect(() => {
        LoginSessionCheck();
    }, []);

    return (
        <>
            <RecordBar pageGetter={pageGetter}/>
            <div className='CrescendoMain'>
                {renderPage()}
            </div>
        </>
    );
};

export default Crescendo_main;