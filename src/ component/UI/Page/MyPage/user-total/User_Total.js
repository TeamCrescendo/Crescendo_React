import React from 'react';
import './User_Total.scss';
import { RiChatDeleteFill } from "react-icons/ri";

const UserTotal = () => {
    function createData(title, viewCount, like, dislike, downloadCount) {
        return { title, viewCount, like, dislike, downloadCount };
    }

    const rows = [
        createData('엘리제를 위하여', 159, 6, 24, 4),
        createData('젓가락 행진곡', 237, 9, 37, 4),
        createData('아무노래', 262, 16, 24, 6),
        createData('너를위해서', 305, 3, 67, 4),
        createData('좋은 날', 356, 16, 49, 3),
        createData('좋은 2', 356, 16, 49, 3),
        createData('좋은 3', 356, 16, 49, 3),
        createData('좋은 4', 356, 16, 49, 3),
        createData('좋은 5', 356, 16, 49, 3),
        createData('좋은 6', 356, 16, 49, 3),
        createData('좋은 7', 356, 16, 49, 3),
        createData('좋은 8', 356, 16, 49, 3),
    ];

    return (
        <div className="user-total-container">
            <div className="table-container">
                <div className="table-row">
                    <div>공유 악보</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                    <div>싫어요</div>
                    <div>다운로드 횟수</div>
                    <div></div>
                </div>
                <div className="scroll-container">
                    {rows.map((row) => (
                        <div className="table-data" key={row.title}>
                            <div style={{cursor:"pointer", color:"deepskyblue", fontWeight:"bold"}}>{row.title}</div>
                            <div>{row.viewCount}회</div>
                            <div>{row.like}개</div>
                            <div>{row.dislike}개</div>
                            <div>{row.downloadCount}번</div>
                            <div><RiChatDeleteFill style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTotal;
