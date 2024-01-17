import React, {useRef, useState} from 'react';

import './LoginButton.scss';

const LoginButton = ({ isOpen, onClose }) => {
    const modalBackground = useRef();


    return (
        isOpen && (
            <div
                className="login-modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        onClose();
                    }
                }}
            >
                <div className="login-modal-content">
                    <p>로그인</p>
                    <button className="loginModalCloseBtn" onClick={onClose}>
                        창 닫기
                    </button>
                </div>
            </div>
        )
    );
};

export default LoginButton;