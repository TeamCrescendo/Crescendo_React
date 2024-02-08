import React from 'react';

import './Register_Button.scss';

const RegisterButton = ({ registerSubmit }) => {
    return (
        <button className="register-btn" type="button" onClick={registerSubmit}>
            회원가입
        </button>
    );
};

export default RegisterButton;