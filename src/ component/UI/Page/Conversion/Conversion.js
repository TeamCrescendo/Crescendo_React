import React from 'react';

import './Conversion.scss';
import Login_modal_Button from "../../button/login_modal_btn/Login_modal_Button";
import classNames from "classnames";

const Conversion = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <div className={`conversionContainer ${setAnimation}`}>
            <div className="conversionHeader">
                <Login_modal_Button />
            </div>
            <div className="conversionMain">
                악보변환 페이지
            </div>
        </div>
    );
};

export default Conversion;