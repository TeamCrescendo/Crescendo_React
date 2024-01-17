import React, {useRef, useState} from 'react';

import './LoginButton.scss';

const LoginButton = () => {  
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const modalBackground = useRef();
    
    
    return (
        <>
            <button className="loginModalOpenBtn" type="button" onClick={() => setLoginModalOpen(true)}>
                로그인
            </button>

            {
                loginModalOpen &&
                <div className="login-modal-container" ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setLoginModalOpen(false);
                    }
                }}>
                    <div className="login-modal-content">
                        <p>로그인</p>
                        <button className="loginModalCloseBtn" onClick={() => setLoginModalOpen(false)}>
                            창 닫기
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default LoginButton;