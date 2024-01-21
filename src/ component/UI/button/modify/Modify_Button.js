import React from 'react';

import './Modify_Button.scss';

const ModifyButton = ({ modifySubmit }) => {
    return (
        <button className="modify-btn" type="submit" onClick={modifySubmit}>
            수정하기
        </button>
    );
};

export default ModifyButton;