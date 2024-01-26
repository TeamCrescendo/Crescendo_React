import React from 'react';

import Button from 'react-bootstrap/Button';
import './Inquiry_modal_Button.scss';

const InquiryModalButton = ({ modifyButtonClick }) => {
    return (
        <div className="inquiry-send-button">
            <Button variant="primary" onClick={modifyButtonClick}>문의하기</Button>
        </div>
    );
};

export default InquiryModalButton;