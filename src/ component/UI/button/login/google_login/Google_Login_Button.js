import React from 'react';

import './Google_Login_Button.scss';

const GoogleLoginButton = ({ googleLogin }) => {

    const googleLoginBtnHandler = () => {
        googleLogin();
    }

    return (
        <button className="GoogleloginBtn" type="button" onClick={googleLoginBtnHandler}>
            <div className="googleIcon">
                <img className="googleImg" src="img/google.png" alt="구글이미지" />
            </div>
            <span>구글 로그인</span>
        </button>
    );
};

export default GoogleLoginButton;