import React from 'react';

import './Quit_Button.scss';

const QuitButton = ({ restoreSubmit }) => {
    return (
        <button className="quit-btn" type="submit" onClick={restoreSubmit}>
            회원탈퇴
        </button>
    );
};

export default QuitButton;