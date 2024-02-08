import React from 'react';

import './Kakao_Login_Button.scss';

const KakaoLoginButton = () => {
    return (
        <button className="KakaologinBtn" type="button" onClick="">
            <div className="kakaoIcon">
                <img className="kakaoImg" src="img/kakao_img.png" alt="카카오이미지" />
            </div>
            <span>카카오 로그인</span>
        </button>
    );
};

export default KakaoLoginButton;