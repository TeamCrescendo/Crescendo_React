import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '././CoverdionSearch.scss';
import axios from 'axios';

const ConversionSearch = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [sheetMusic, setSheetMusic] = useState('');
    const [error, setError] = useState('');

    const LOCAL_PORT: string = '8484';
    const API_BASE_URL = 'http://localhost:';
    const SCORE: string = '/api/score/youtube ';
    const SCORE_URL = API_BASE_URL + LOCAL_PORT + SCORE ;

// export const AUTH_URL = API_BASE_URL + '/api/auth'; // 이 부분은 아직 사용되지 않으므로 주석 처리
    const handleSearch = async () => {
        try {
            if (!youtubeLink) {
                setError('유튜브 링크를 입력하세요.');
                return;
            }

            // SCORE_URL을 사용하여 서버에 요청을 보내고 결과를 받아옴
            // axios는 응답 데이터를 자동으로 JSON으로 파싱해주지만, fetch는 기본적으로 그렇지 않습니다.
            // 따라서 fetch를 사용할 때는 수동으로 response.json()을 호출하여 JSON 데이터를 파싱
            const response = await axios({
                method: 'POST',
                url: SCORE_URL,
                data: { youtubeLink },
                headers: {
                    'content-Type': 'application/json',
                },

            });
            // 요청이 성공적으로 완료되었는지 확인
            if (response && response.data) {
                // 서버에서 받은 악보 정보를 상태에 업데이트
                setSheetMusic(response.data.sheetMusic);
            } else {
                // 예상치 못한 응답 형식이면 에러 처리
                alert('서버 응답 형식이 올바르지 않습니다.');
            }
            // 서버에서 받은 악보 정보를 상태에 업데이트
            setSheetMusic(response.data.sheetMusic);
        } catch (error) {
            if (error.response) {
                // 서버 응답이 있는 경우
                if (error.response.status === 400) {
                    // 400 상태 코드: 클라이언트 요청이 잘못됨
                    alert(`클라이언트 오류 발생: ${error.response.data.error}`);
                } else if (error.response.status === 500) {
                    // 500 상태 코드: 서버에서 에러가 발생함
                    alert(`서버 오류 발생: ${error.response.data.error}`);
                } else {
                    // 다른 상태 코드일 경우
                    alert(`알 수 없는 오류 발생: ${error.message}`);
                }
            } else {
                // 서버 응답이 없는 경우 (네트워크 오류 등)
                alert(`서버에 연결할 수 없습니다: ${error.message}`);
            }
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
