
import React, { useRef, useState, useEffect } from 'react';
import './Conversion.scss';
import {FaSearch} from "react-icons/fa";
import classNames from "classnames";
import UserInfomation from "../../login_info/User_Infomation";
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import Board from "../Board/Board";
import {getCurrentLoginUser} from "../../../util/login-util";

// function Header() {
//     return null;
// }

const Conversion = ({ isForward, LoginHandler, isLogin, loginInfo,
                        LoginCheck, logoutHandler
}) => {
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


    // const[token, setToken] = useState(getCurrentLoginUser().token);
    const renderUserInfo = () => {
        if (loginInfo !== undefined) {
            return <UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler} />;
        } else {
            return <Login_modal_Button isLogin={LoginHandler} LoginCheck={LoginCheck} />;
        }
    }

    useEffect(() => {
        newsTicker(1500);
        LoginCheck();
    }, []);

    return (
        <>
            <div className={`conversionContainer ${setAnimation}`}>
                <div className="conversionHeader">
                    {renderUserInfo()}
                </div>
                <div className="conversionMain">
                    {/*-----------------검색-------------------------*/}
                    <div className="w">
                        <div className="search">
                            <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
                            <button type="submit" className="searchButton">
                                <FaSearch/>
                            </button>
                        </div>
                    </div>

                    {/*--------------------업로드-------------------------*/}
                    <div>
                        <h1 className="form-up">파일을 업로드 하세요 !</h1>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleOnChange}
                            accept="audio/*" // 이 부분이 오디오 파일만 허용하도록 하는 부분
                            style={{display: 'none'}}
                        />
                        <button className="file-btn" onClick={onChooseFile}>
                            <span className="material-symbol-rounded">🎵</span> Upload Audio File
                        </button>
                        {selectedFile && (
                            <div className="selected-file">
                                <p>{selectedFile.name}</p>
                                <button onClick={removeFile}>
                                    <span className="material-symbols-rounded">❌</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="rolling">
                        <ul className="rolling__list" ref={ulRef}>
                            <li>1. River Flows In You</li>
                            <li>2. Love Me</li>
                            <li>3. May be</li>
                            <li>4. When the love falls</li>
                            <li>5. Yellow Room</li>
                            <li>6. Love</li>
                            <li>7. Kiss the rain</li>
                            <li>8. The Moment</li>
                            <li>9. Memories In My Eyes</li>
                            <li>10. Hope</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conversion;