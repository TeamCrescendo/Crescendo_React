import React, {useState} from 'react';
import { BsCircleFill } from 'react-icons/bs';

import './Page_Index.scss';

const PageIndex = ({ pageId, clickPageGetter, indexClickPageId }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getColor = (index) => {
        if (hoveredIndex === index) {
            return '#3333FF'; // 호버됐을 때 색상 변경
        }
        // 다른 경우에는 페이지 ID에 따른 색상 적용
        return pageId === index ? 'rgba(100, 216, 255, 0.7)' : 'white';
    };

    const renderIndex = () => {
        // pageId 값에 따라 색상을 설정합니다.
        // const getColor = (index) => (pageId === index ? 'rgba(100, 216, 255, 0.7)' : 'white');

        const pageClick = (id) => {
            clickPageGetter(id);
            indexClickPageId(id);
        }

        return (
            <div className="page-index">
                <ul>
                    <li
                        className="index-first"
                        onClick={() => pageClick(1)}
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="index-icon" style={{ color: getColor(1) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(1) }}>
                            악보변환
                        </div>
                    </li>
                    <li
                        className="index-second"
                        onClick={() => pageClick(2)}
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="index-icon" style={{ color: getColor(2) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(2) }}>
                            나만의 AI음악
                        </div>
                    </li>
                    <li
                        className="index-third"
                        onClick={() => pageClick(3)}
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="index-icon" style={{ color: getColor(3) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(3) }}>
                            악보공유
                        </div>
                    </li>
                    <li className="index-fourth"
                        onClick={() => pageClick(4)}
                        onMouseEnter={() => setHoveredIndex(4)}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        <div className="index-icon" style={{ color: getColor(4) }}>
                            <BsCircleFill />
                        </div>
                        <div className="index-name" style={{ color: getColor(4) }}>
                            개인서비스
                        </div>
                    </li>
                    <li className="index-fifth"
                        onClick={() => pageClick(5)}
                        onMouseEnter={() => setHoveredIndex(5)}
                        onMouseLeave={() => setHoveredIndex(null)}>
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
