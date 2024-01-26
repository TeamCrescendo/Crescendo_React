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
import {getCurrentLoginUser} from "../../../util/login-util";
import { Document, Page } from 'react-pdf';





const ConversionPage = ({isForward, LoginHandler, loginInfo, LoginCheck, logoutHandler}) => {
    // pdf 파일
    const [pdfFile, setPdfFile] = useState(null);


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
        'content-type': 'application/json',
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
    const submitHandler = async (e) =>{
        e.preventDefault();
        console.log("서브밋됌")
        const res = await ("http://localhost:8484/api/score/youtube", {
            method:"POST",
            headers:requestHeader,
            responseType: "arraybuffer",
            body: JSON.stringify({
                "url": youtubeLink
            })
        });
        if(res.status ===200) {
            const json = await res.json();
            const blob = new Blob([json], { type: 'application/pdf' });
            // Blob을 파일로 변환
            const file = new File([blob], 'example.pdf', { type: 'application/pdf' });

            setPdfFile(file);

        }
    }

//{`mainContainer ${setAnimation}`}
    return (
        <div className='conversion-page'>
            <form className="form" onSubmit={submitHandler}>
                <Input error
                       className="youtube-link"
                       startDecorator={<FaYoutube />}
                       endDecorator={<IoIosSend onClick={submitHandler}/>}
                       placeholder="유튜브 링크를 적어주세요!!"
                       size="lg"
                       color="danger"
                       variant="outlined"
                       onChange={youtubeLinkHandler}
                       sx={{color:'error.main'}}/>
                <div className={cn('error', {none : isValid})}>
                    <InfoOutlined />
                    링크 형식으로 적어주세요!!
                </div>
            </form>
            {pdfFile && (
                <Document file={pdfFile}>
                    <Page pageNumber={1} />
                </Document>
            )}
        </div>
    );
};

export default ConversionPage;