import React from 'react';

import Button from 'react-bootstrap/Button';

const MessageModalButton = ({ modifyButtonClick, row }) => {

    const clickHandler = () => {
        modifyButtonClick(row);
    }

    return (
        <Button variant="primary" onClick={clickHandler}>내용확인</Button>
    );
};

export default MessageModalButton;