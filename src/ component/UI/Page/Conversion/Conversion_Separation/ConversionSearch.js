import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '././CoverdionSearch.scss'
import axios from 'axios';

const ConversionSearch = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [sheetMusic, setSheetMusic] = useState('');

    const handleSearch = async () => {
        try {
            if (!youtubeLink) return;

            const backendUrl = 'http://localhost:8484/api/score/youtube';

            const response = await axios.post(backendUrl, { youtubeLink });

            setSheetMusic(response.data.sheetMusic);
        } catch (error) {
            alert(`검색 중 에러 발생: ${error.message}`);
        }
        setYoutubeLink('');
    };

    return (
        <div className="w">
            <div className="search">
                <input
                    type="text"
                    className="searchTerm"
                    placeholder="유튜브 링크를 입력하세요"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
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