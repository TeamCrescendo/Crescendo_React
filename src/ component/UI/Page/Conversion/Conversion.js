import React from 'react';

import './Conversion.scss';
import LoginButton from "../../button/login/LoginButton";
import classNames from "classnames";

const Conversion = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <div className={`conversionContainer ${setAnimation}`}>
            <div className="conversionHeader">
                <LoginButton />
            </div>
            <div className="conversionMain">
                악보변환 페이지
            </div>
        </div>
    );
};

export default Conversion;