import React from 'react';
import './TeamInfo.scss';
import classNames from "classnames";

const TeamInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <header className="head1">
            <h1>
                This is the team introduction page
            </h1>
            <div className={`teaminfoContainer ${setAnimation}`}>
                팀 소개 페이지 입니다
            </div>
        </header>

    );
};

export default TeamInfo;