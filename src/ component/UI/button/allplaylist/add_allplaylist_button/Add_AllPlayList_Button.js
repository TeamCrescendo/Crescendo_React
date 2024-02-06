import React from 'react';

const AddAllPlayListButton = ({ allplaylistSubmit }) => {
    return (
        <button className="addallplaylist-btn" type="submit" onClick={allplaylistSubmit}>
            생성하기
        </button>
    );
};

export default AddAllPlayListButton;