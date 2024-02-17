import React from 'react';
import './Quit_Cancel_Button.scss';

const QuitCancelButton = ({ cancelDelete }) => {
    return (
        <button className="quit-cancel-btn" type="submit" onClick={cancelDelete}>
            회원탈퇴 취소
        </button>
    );
};

export default QuitCancelButton;