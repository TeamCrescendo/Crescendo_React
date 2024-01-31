import React, {useState, useEffect} from 'react';
import './MyPage.scss';
import classNames from "classnames";
import { SlClose } from "react-icons/sl"

const MyPage = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <>
            <header className="hhh">
                <h1>
                    My Page
                </h1>
                <div className={`webinfoContainer ${setAnimation}`}>
                    <div className="card">
                        <div className="card-img">
                            <div className="card-head">
                                <span className="close-logo"><SlClose/></span>
                                <h4>
                                    Alarm
                                </h4>
                                <h3 className="card-title">
                                    앗 잠시만요!
                                </h3>

                            </div>
                        </div>
                        <div className="card-main">
                            <br/>
                            <p className="card-text">
                                마이페이지를 볼려면 로그인을 하세요!
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="#" className="btn btn-primary" >
                                LOGIN
                            </a>
                            <br/>
                            <a href="#">
                                <span className="join-text">로그인이 없으신가요?</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>


    );
};

export default MyPage;