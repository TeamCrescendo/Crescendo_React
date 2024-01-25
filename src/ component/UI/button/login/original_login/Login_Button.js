import React from 'react';

import './Login_Button.scss';

const LoginButton = ({ loginSubmit }) => {
    return (
        <button className="loginBtn" type="submit" onClick={loginSubmit}>
            로그인
        </button>
    );
};

export default LoginButton;