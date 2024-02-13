import React from 'react';

import Button from 'react-bootstrap/Button';
import './Inquiry_modal_Button.scss';

const InquiryModalButton = ({ inquiryButtonClick }) => {
    return (
        <div className="inquiry-send-button">
            <Button className="inq-btn" variant="primary" onClick={inquiryButtonClick}>문의하기</Button>
        </div>
    );
};

export default InquiryModalButton;