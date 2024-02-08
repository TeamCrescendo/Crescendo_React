import React from 'react';
import Button from 'react-bootstrap/Button';

import './Inquiry_Button.scss';

const InquiryButton = () => {
    return (
        <>
            <Button type="submit" variant="success" className="inquiry-btn">문의전송</Button>{' '}
        </>
    );
};

export default InquiryButton;