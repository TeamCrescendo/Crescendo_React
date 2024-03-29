import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import './ConversionPage.scss';
import Input from '@mui/joy/Input'; // mui에서 인풋 태그 가져옴
import { FaYoutube } from "react-icons/fa"; // 리액트 아이콘에서 유튜브 가져옴
import { IoIosSend } from "react-icons/io";
import {FormControl, FormHelperText, FormLabel} from "@mui/joy";
import {InfoOutlined} from "@mui/icons-material";
import cn from "classnames";
import {getCurrentLoginUser, isLogin} from "../../../util/login-util";
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Score from "../../conversion/score/Score";
import {SCORE_URL} from "../../../../config/host-config";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const ConversionPage = ({isForward, LoginHandler, loginInfo, LoginCheck, logoutHandler, googleLogin}) => {
    // pdf 파일
    const [pdfFile, setPdfFile] = useState(null);
    const [scoreId, setScoreId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isConversion, setIsConversion] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    // const[token, setToken] = useState(getCurrentLoginUser().token);
    const renderUserInfo = () => {
        if (loginInfo !== undefined) {
            return <UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}/>;
        } else {
            return <Login_modal_Button isLogin={LoginHandler} LoginCheck={LoginCheck}/>;
        }
    }

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const [isValid, setIsValid] = useState(true); // 사용자가 작성한 링크가 링크형태인지 확인
    const [youtubeLink, setYoutubeLink] = useState("");

    useEffect(() => {
        LoginCheck();
    }, []);

    const youtubeLinkHandler = e =>{
        // console.log(e.target.value);
        setYoutubeLink(e.target.value);

        // YouTube URL 패턴 정의
        // const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtube\/)([a-zA-Z0-9_-]{11})/;
        // 정규 표현식을 사용하여 링크 검사
        // let match = youtubeLink;
        // console.log(match);
        // setIsValid(match);
    }

    // 검색 했을 때 이벤트
    const submitHandler = async (e) => {
        e.preventDefault();

        if (loginInfo.userDownloadChance < 1) {
            alert("변환 기회가 모두 소진되었습니다.");
            return;
        }

        if (youtubeLink.length < 10) {
            alert("유튜브 링크가 올바르게 입력되지 않았습니다.");
            return;
        }

        setIsLoading(true);
        setIsConversion(true);
        const res = await fetch(SCORE_URL + "/youtube", {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify({
                "url": youtubeLink
            })
        });
        if (res.status === 200) {
            const arrayBuffer = await res.arrayBuffer();
            const idValue = res.headers.get("score-id");
            // console.log("악보번호: ", idValue);
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const file = new File([blob], 'example.pdf', { type: 'application/pdf' });
            setScoreId(idValue);
            setPdfFile(file);
            setIsLoading(false);
            console.log(file);
        }else if(res.status===500){
            console.log("서버 에러");
            setIsConversion(false);
            setPdfFile(null);
            setIsLoading(false);
            alert("서버에러입니다");
        }
        else {
            setIsConversion(false);
            setPdfFile(null);
            setIsLoading(false);
            alert("변환 실패");
        }
        LoginCheck();
    }




    // 비로그인시 엔터키방지
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 엔터키 이벤트를 중지시킴
        }
    };

    // 돌아오는 핸들러
    const exitHandler = () =>{
        setIsConversion(false);
        setPdfFile(null);
        setIsLoading(false);
        setYoutubeLink("");
    }

    useEffect(() => {
        if (isLogin()) {
            if (loginInfo) {
                if (loginInfo.auth === 'ADMIN') {
                    setIsAdmin(true);
                }
            }
        }
    }, [loginInfo]);

    const renderPage = () => {
        return (
            <>
                <div className="head">
                    <UserInfomation googleLogin={googleLogin} logoutHandler={logoutHandler} loginInfo={loginInfo}/>
                </div>
                {
                    pdfFile
                    ?
                    (
                        <>
                            <Score pdfFile = {pdfFile} scoreId={scoreId} loginInfo={loginInfo} exitHandler={exitHandler}/>
                        </>
                    )
                    :
                    (
                        <>
                            <span className="conversion-info">유튜브 동영상을 악보로 변환하기</span>

                            <form className={cn("form", {none:isConversion})} onSubmit={submitHandler}>
                                <span style={{fontSize:"20px"}}>※유튜브 저작권 정책에 의해서 일부 동영상은 변환이 불가능 할 수도 있습니다.</span>
                                {
                                    isAdmin
                                    ?
                                        (
                                            <>
                                                <Input
                                                    error
                                                    className=" youtube-link"
                                                    startDecorator={<FaYoutube style={{color:"red", fontSize:"40px"}}/>}
                                                    endDecorator={
                                                        <div className="sendButton" style={{cursor:"pointer"}}>
                                                            <IoIosSend />
                                                            <span style={{fontWeight:"bold"}}>변환</span>
                                                        </div>
                                                    }
                                                    placeholder="관리자는 이용할 수 없는 기능입니다."
                                                    size="lg"
                                                    color="danger"
                                                    variant="outlined"
                                                    sx={{ color: 'error.main' }}
                                                    disabled={true}
                                                />
                                            </>
                                        )
                                    :
                                        (
                                            <>
                                                <Input
                                                    error
                                                    className=" youtube-link"
                                                    startDecorator={<FaYoutube style={{color:"red", fontSize:"40px"}}/>}
                                                    endDecorator={
                                                        <div className="sendButton" style={{cursor:"pointer"}} onClick={submitHandler}>
                                                            <IoIosSend />
                                                            <span style={{fontWeight:"bold"}}>변환</span>
                                                        </div>
                                                    }
                                                    placeholder={isLogin()?"유튜브 링크 붙여넣기":"로그인이 필요한 기능입니다."}
                                                    size="lg"
                                                    color="danger"
                                                    variant="outlined"
                                                    onChange={youtubeLinkHandler}
                                                    sx={{ color: 'error.main' }}
                                                    disabled={!isLogin()}
                                                />
                                            </>
                                        )
                                }
                                <div className={cn('error', { none: isValid })}>
                                    <InfoOutlined />
                                    올바른 유튜브 링크를 입력해주세요!
                                </div>
                            </form>
                        </>
                    )
                }
            </>
        )
    }


    const [dots, setDots] = useState('...');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                if (prevDots === '...') return '.';
                else if (prevDots === '.') return '..';
                else if (prevDots === '..') return '...';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const loadingPage = () => {
        return (
            <>
                <div className="loading-container">
                    <span>유튜브 동영상을 악보로 변환중입니다{dots}</span>
                    <img src="img/write.gif" alt="베토벤 로딩" />
                </div>
            </>
        )
    }


//{`mainContainer ${setAnimation}`}
    return (
        <>
            <div className={`conversion-page  ${setAnimation}`}>
                {
                    isLoading ? (
                        loadingPage()
                    ) : (
                        renderPage()
                    )
                }
            </div>
        </>
    );
};

export default ConversionPage;