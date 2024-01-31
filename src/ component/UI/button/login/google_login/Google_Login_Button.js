import React from 'react';

import './Google_Login_Button.scss';

const GoogleLoginButton = () => {
    return (
        <button className="GoogleloginBtn" type="button" onClick="">
            <div className="googleIcon">
                <img className="googleImg" src="img/google.png" alt="구글이미지" />
            </div>
            <span>구글 로그인</span>
        </button>
    );
};

export default GoogleLoginButton;