import React from 'react';
import Button from "react-bootstrap/Button";

const InquiryContentModalButton = ({modifyButtonClick, row}) => {

    const clickHandler = () => {
        modifyButtonClick(row);
    }

    return (
        <Button variant="primary" onClick={clickHandler}>내용확인</Button>
    );
};

export default InquiryContentModalButton;