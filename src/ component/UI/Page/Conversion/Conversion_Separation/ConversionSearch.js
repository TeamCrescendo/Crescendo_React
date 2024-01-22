import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import '././CoverdionSearch.scss';

const ConversionSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // 간단한 검색 결과 배열을 시뮬레이션합니다.
        const simulatedSearchResults = [
            { id: 1, title: '검색 결과 1' },
            { id: 2, title: '검색 결과 2' },
            { id: 3, title: '검색 결과 3' },
            { id: 4, title: '검색 결과 4' },
            { id: 5, title: '검색 결과 5' },
        ];

        // 시뮬레이션된 검색 결과를 상태에 설정합니다.
        setSearchResults(simulatedSearchResults);

        // 검색을 처리한 후 검색어 입력값 초기화
        setSearchTerm('');
    };

    // 검색 결과 항목을 클릭할 때 처음 화면으로 돌아가는 함수
    const handleResultClick = () => {
        // 여기에 처음 화면으로 이동하는 코드를 추가하세요.
        window.location.href = '/';
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
                        <li key={result.id} onClick={handleResultClick}>
                            <p>{result.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ConversionSearch;