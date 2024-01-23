import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '././CoverdionSearch.scss';
import axios from 'axios';

const ConversionSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sheetMusic, setSheetMusic] = useState('');

    const handleSearch = async () => {
        try {
            if (!searchTerm) return;
            // 백엔드 에서 localhost 받아서 만듬
            const backendUrl = 'http://localhost:5000/api/convert';

            const response = await axios.post(backendUrl, { youtubeLink: searchTerm });

            setSearchResults(response.data);
            setSheetMusic(response.data.sheetMusic);
        } catch (error) {
            console.error('검색 중 에러 발생:', error);
        }

        setSearchTerm('');
    };

    const handleResultClick = (conversionLink) => {
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

            {/*<div className="searchResults">*/}
            {/*    <h3>검색 결과</h3>*/}
            {/*    <ul>*/}
            {/*        {searchResults.map((result) => (*/}
            {/*            <li key={result.id} onClick={() => handleResultClick(result.conversionLink)}>*/}
            {/*                <p>{result.title}</p>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            <div className="sheetMusic">
                <h3>악보</h3>
                <pre>{sheetMusic}</pre>
            </div>
        </div>
    );
};

export default ConversionSearch;