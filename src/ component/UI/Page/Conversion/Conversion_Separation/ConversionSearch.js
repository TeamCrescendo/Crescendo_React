import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '././CoverdionSearch.scss';
import { SCORE_URL } from './server';
import axios from 'axios';

const ConversionSearch = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [sheetMusic, setSheetMusic] = useState('');

    const handleSearch = async () => {
        try {
            if (!youtubeLink) return;

            // SCORE_URL을 사용하여 서버에 요청을 보내고 결과를 받아옴
            // axios는 응답 데이터를 자동으로 JSON으로 파싱해주지만, fetch는 기본적으로 그렇지 않습니다. 
            // 따라서 fetch를 사용할 때는 수동으로 response.json()을 호출하여 JSON 데이터를 파싱
            const response = await axios({
                method: 'POST',
                url: SCORE_URL,
                data: { youtubeLink },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // 서버에서 받은 악보 정보를 상태에 업데이트
            setSheetMusic(response.data.sheetMusic);
        } catch (error) {
            alert(`검색 중 에러 발생: ${error.message}`);
        }

        // 검색 후에는 유튜브 링크를 비움
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
