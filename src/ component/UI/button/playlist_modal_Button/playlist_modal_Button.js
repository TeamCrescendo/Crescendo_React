import React from 'react';

import Button from 'react-bootstrap/Button';

const PlaylistModalButton = ({ modifyButtonClick, row }) => {
    const clickHandler = () => {
        modifyButtonClick();
    }

    return (
        <Button variant="primary" onClick={clickHandler}>재생목록</Button>
    );
};

export default PlaylistModalButton;