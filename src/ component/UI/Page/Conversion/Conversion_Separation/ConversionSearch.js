import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import '././CoverdionSearch.scss';

const ConversionSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // 검색어가 비어 있으면 검색하지 않음
            if (!searchTerm) return;

            // 예시: 백엔드 엔드포인트 URL (적절한 주소로 변경해야 함)
            // 너가 만든 localhost 적용
            const backendUrl = 'http://localhost:5000/api/convert';

            // 서버로 검색 요청 보냄
            const response = await axios.post(backendUrl, { youtubeLink: searchTerm });

            // 백엔드에서 받은 검색 결과를 상태에 설정
            setSearchResults(response.data);
        } catch (error) {
            console.error('검색 중 에러 발생:', error);
        }

        // 검색을 처리한 후 검색어 입력값 초기화
        setSearchTerm('');
    };

    // 검색 결과 항목을 클릭할 때 악보 변환 페이지로 이동하는 함수
    const handleResultClick = (conversionLink) => {
        // 악보 변환 페이지로 이동
        window.location.href = conversionLink;
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

            {/* 검색 결과를 표시하는 부분 */}
            <div className="searchResults">
                <h3>검색 결과</h3>
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id} onClick={() => handleResultClick(result.conversionLink)}>
                            <p>{result.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default ConversionSearch;