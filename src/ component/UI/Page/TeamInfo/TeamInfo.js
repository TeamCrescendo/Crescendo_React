import './TeamInfo.scss';
import classNames from "classnames";
import React from 'react';
import Form1 from './form/form1'

const TeamInfo = ({ isForward , LoginHandler, loginInfo}) => {
    console.log("실행함")
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <>
            <div className={`teaminfoContainer ${setAnimation}`}>
                <h1>
                    Beethoven Tomato Deluxe
                </h1>
                <Form1/>
            </div>
        </>
    );
};

export default TeamInfo;
