import React, {useState, useEffect} from 'react';
import './MyPage.scss';
import classNames from "classnames";
import Alram1 from "./a1/alram1"
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
                        <Alram1/>
                </div>
            </header>
        </>


    );
};

export default MyPage;