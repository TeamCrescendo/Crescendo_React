import React from 'react';
import { BsCircleFill } from 'react-icons/bs';

import './Page_Index.scss';

const PageIndex = ({ pageId, clickPageGetter, indexClickPageId }) => {
    const renderIndex = () => {
        // pageId 값에 따라 색상을 설정합니다.
        const getColor = (index) => (pageId === index ? 'rgba(100, 216, 255, 0.7)' : 'white');

        const pageClick = e => {
            let id = e.currentTarget.id;
            clickPageGetter(id);
            indexClickPageId(id);
        }

        return (
            <div className="page-index">
                <ul>
                    <li className="index-first" onClick={pageClick} id="1">
                        <div className="index-icon" style={{ color: getColor(1) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(1) }}>
                            악보변환
                        </div>
                    </li>
                    <li className="index-second" onClick={pageClick} id="2">
                        <div className="index-icon" style={{ color: getColor(2) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(2) }}>
                            나만의 AI음악
                        </div>
                    </li>
                    <li className="index-third" onClick={pageClick} id="3">
                        <div className="index-icon" style={{ color: getColor(3) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(3) }}>
                            악보공유
                        </div>
                    </li>
                    <li className="index-fourth" onClick={pageClick} id="4">
                        <div className="index-icon" style={{ color: getColor(4) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(4) }}>
                            개인서비스
                        </div>
                    </li>
                    <li className="index-fifth" onClick={pageClick} id="5">
                        <div className="index-icon" style={{ color: getColor(5) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(5) }}>
                            개발팀 소개
                        </div>
                    </li>
                </ul>
            </div>
        );
    };

    return renderIndex();
};

export default PageIndex;
