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
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const ConversionPage = ({isForward, LoginHandler, loginInfo, LoginCheck, logoutHandler}) => {
    // pdf 파일
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [isLoading, setIsLoading] = useState(false);


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

    // 검색 했을 때 이벤트
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("http://localhost:8484/api/score/youtube", {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify({
                "url": youtubeLink
            })
        });

        if (res.status === 200) {
            const arrayBuffer = await res.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const file = new File([blob], 'example.pdf', { type: 'application/pdf' });
            setPdfFile(file);
            setIsLoading(false);
        } else {
            console.error("Failed to fetch PDF:", res.statusText);
            setIsLoading(false);
        }
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const downloadPdf = () => {
        const url = URL.createObjectURL(pdfFile);
        console.log(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'example.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const shareHandler = async (e) => {
        const formData = new FormData();

        formData.set("pdfFile", pdfFile, "example.pdf");

        const headers = {
            'Authorization': 'Bearer ' + token,
        };

        fetch("http://localhost:8484/api/score/share", {
            method: "PUT",
            headers: headers,
            body: formData
        })
            .then(res => res.text())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const renderPage = () => {
        return (
            <>
                <form className="form" onSubmit={submitHandler}>
                    <Input
                        error
                        className="youtube-link"
                        startDecorator={<FaYoutube />}
                        endDecorator={<IoIosSend onClick={submitHandler} />}
                        placeholder="유튜브 링크를 적어주세요!!"
                        size="lg"
                        color="danger"
                        variant="outlined"
                        onChange={youtubeLinkHandler}
                        sx={{ color: 'error.main' }}
                    />
                    <div className={cn('error', { none: isValid })}>
                        <InfoOutlined />
                        링크 형식으로 적어주세요!!
                    </div>
                </form>
                {pdfFile && (
                    <div>
                        <p>페이지 수: {numPages}</p>
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
                            이전 페이지
                        </button>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}>
                            다음 페이지
                        </button>
                        <button onClick={shareHandler}>공유하기</button>
                        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page onClick={downloadPdf} pageNumber={currentPage} />
                        </Document>
                    </div>
                )}
            </>
        )
    }

    const loadingPage = () => {
        return (
            <>
                <div className="loading-container">
                    <span>유튜브 링크를 악보로 변환중입니다...</span>
                    <img src="img/write.gif" alt="베토벤 로딩" />
                </div>
            </>
        )
    }


//{`mainContainer ${setAnimation}`}
    return (
        <div className='conversion-page'>
            {
                isLoading ? (
                    loadingPage()
                ) : (
                    renderPage()
                )
            }
        </div>
    );
};

export default ConversionPage;