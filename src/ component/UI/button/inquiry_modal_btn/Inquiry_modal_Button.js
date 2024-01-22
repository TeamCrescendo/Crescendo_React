import React from 'react';

import Button from 'react-bootstrap/Button';

const InquiryModalButton = ({ modifyButtonClick }) => {
    return (
        <Button variant="primary" onClick={modifyButtonClick}>문의하기</Button>
    );
};

export default InquiryModalButton;