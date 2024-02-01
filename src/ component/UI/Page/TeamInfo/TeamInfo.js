import './TeamInfo.scss';
import classNames from "classnames";
import React from 'react';
import Form1 from './form/form1'


const TeamInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });


    return (
        <header className="head1">
            <h1>
                Beethoven Tomato Deluxe
            </h1>
            <div className={`teaminfoContainer ${setAnimation}`}>
                <Form1/>
            </div>
        </header>
    );
};
export default TeamInfo;
