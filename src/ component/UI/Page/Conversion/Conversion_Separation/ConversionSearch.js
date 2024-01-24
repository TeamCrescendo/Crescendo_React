import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './CoverdionSearch.scss';

const ConversionSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sheetMusic, setSheetMusic] = useState('');
    const handleSearch = async () => {
        try {
            if (!searchTerm) return;

            const backendUrl = 'http://localhost:8484/api/convert';

            // 여기에서 isMajor 값을 설정하여 서버로 전송
            const response
                = await axios.post(backendUrl, { youtubeLink: searchTerm, isMajor: true });

            // 백엔드에서 받은 검색 결과 및 악보를 상태에 설정
            setSheetMusic(response.data.sheetMusic);
        } catch (error) {
            alert(`검색 중 에러 발생: ${error.message}`);
        }
        setSearchTerm('');
    };
    return (
        <div className="w">
            <div className="search">
                <input
                    type="text"
                    className="searchTerm"
                    placeholder="무엇을 찾고 계신가요?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="button"
                    className="searchButton"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>
            <div className="sheetMusic">
                <h3>악보</h3>
                <pre>{sheetMusic}</pre>
            </div>
        </div>
    );
};
export default ConversionSearch;