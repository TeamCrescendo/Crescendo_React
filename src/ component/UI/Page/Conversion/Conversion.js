
import React, { useRef, useState, useEffect } from 'react';
import './Conversion.scss';
import {FaSearch} from "react-icons/fa";
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import Board from "../Board/Board";
import ConversionSearch from "./Conversion_Separation/ConversionSearch";
import ConversionUpload from "./Conversion_Separation/ConversionUpload";
import ConversionRanking from "./ConversionRanking";

const Conversion = (
    { isForward, LoginHandler, isLogin, loginInfo,
                     LoginSessionCheck, logoutHandler }) => {
    const inputRef = useRef();
    const ulRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFileType = event.target.files[0].type;

            // 여기에서 확장자가 오디오인지 확인
            if (selectedFileType.startsWith('audio/')) {
                setSelectedFile(event.target.files[0]);
            } else {
                alert('Please choose an audio file.');
            }
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
    };
    // 랭킹
    const newsTicker = (timer) => {
        if (ulRef.current) {
            const ul = ulRef.current;

            window.setInterval(() => {
                ul.style.transitionDuration = '400ms';
                ul.style.marginTop = '-34px';

                window.setTimeout(() => {
                    ul.style.transitionDuration = '';
                    ul.style.marginTop = '';
                    ul.appendChild(ul.querySelector('li:first-child'));
                }, 400);
            }, timer);
        }
    };

    const renderUserInfo = () => {
        switch (isLogin && loginInfo != null) {
            case true:
                return <UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}
                />
            default:
                return <Login_modal_Button isLogin={LoginHandler} LoginSessionCheck={LoginSessionCheck}/>
        }
    }
    useEffect(() => {
        newsTicker(1500);
    }, []);

    return (
        <>

                {/*----------------------검색--------------------------*/}
                <ConversionSearch/>
                {/*--------------------업로드-------------------------*/}
                <ConversionUpload />
                {/*--------------------랭킹-------------------------*/}
                <ConversionRanking/>
        </>
    );
};

export default Conversion;