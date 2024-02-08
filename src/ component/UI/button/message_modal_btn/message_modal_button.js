import React from 'react';

import Button from 'react-bootstrap/Button';

const MessageModalButton = ({ modifyButtonClick, row, onCheck }) => {
    const {messageId, receiver} = row;
    const clickHandler = () => {
        modifyButtonClick(row);
        onCheck(messageId, receiver);
    }

    return (
        <Button variant="primary" onClick={clickHandler}>내용확인</Button>
    );
};

export default MessageModalButton;