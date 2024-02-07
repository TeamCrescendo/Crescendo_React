import React, {useState, useEffect} from 'react';
import './MyPage.scss';
import classNames from "classnames";
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

                </div>
            </header>
        </>


    );
};

export default MyPage;