import React from 'react';
import Button from 'react-bootstrap/Button';

import './Logout_Button.scss';

const LogoutButton = ({ logoutHandler }) => {
    return (
        <>
            <Button className="logoutBtn" variant="warning" onClick={logoutHandler}>로그아웃</Button>{' '}
        </>
    );
};

export default LogoutButton;