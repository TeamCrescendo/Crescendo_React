import React from 'react';

import Button from 'react-bootstrap/Button';

const PlaylistModalButton = ({ modifyButtonClick, row }) => {
    const clickHandler = () => {
        modifyButtonClick(row);
    }

    return (
        <Button variant="primary" onClick={clickHandler}>목록확인</Button>
    );
};

export default PlaylistModalButton;