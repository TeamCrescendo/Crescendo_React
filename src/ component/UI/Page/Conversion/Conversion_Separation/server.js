//express()를 호출하여 앱을 초기화하고, 서버를 생성
const express = require('express');
//bodyParser.json()을 사용하여 요청 본문의 JSON 데이터를 파싱할 수 있도록 설정
const bodyParser = require('body-parser');
//cors를 사용하여 모든 경로에 대해 CORS(Cross-Origin Resource Sharing)를 허용
const cors = require('cors');
const app = express();
//포트번호
const port = 8484;

app.use(bodyParser.json());
app.use(cors());

//POST 요청이 /api/convert 엔드포인트로 들어올 때의 핸들러를 정의
app.post('/api/convert', (req
                          , res) => {
    const youtubeLink = req.body.youtubeLink;
    // 두 번째 매개변수로 장조/단조 여부를 받아오도록 수정
    //클라이언트에서 전송한 데이터 중 youtubeLink와 isMajor를 추출
    //generateSheetMusicFromYouTubeLink 함수를 호출하여 악보를 생성
    const sheetMusic = generateSheetMusicFromYouTubeLink(youtubeLink, req.body.isMajor);
    //생성된 악보를 JSON 형태로 응답
    res.json({ sheetMusic });
});

app.listen(port, () => {
    //app.listen()을 사용하여 서버를 지정된 포트(여기서는 5000)에서 실행
    //서버를 지정된 포트에서 실행
    console.log(`Server is running on port ${port}`);
});

function generateSheetMusicFromYouTubeLink(youtubeLink, isMajor) {
    //generateSheetMusicFromYouTubeLink 함수는 YouTube 링크와 해당 음악이 장조인지 단조인지에 따라 무작위로 악보를 생성
    // isMajor를 기반으로 장조/단조 여부를 판단하여 악보를 생성하는 함수
    //무작위로 음표와 박자를 선택하여 10개의 악보를 생성
    const notesMajor = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const notesMinor = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    const rhythms = ['quarter', 'eighth', 'half'];

    const notes = isMajor ? notesMajor : notesMinor;

    const sheetMusicArray = [];
    //for 루프를 사용하여 무작위로 음표와 박자를 선택하여 10개의 악보를 생성
    //생성된 악보를 문자열로 변환하고 반환
    for (let i = 0; i < 10; i++) {
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        const randomRhythm = rhythms[Math.floor(Math.random() * rhythms.length)];
        sheetMusicArray.push(`${randomNote}-${randomRhythm}`);
    }

    const generatedSheetMusic = sheetMusicArray.join(' ');

    return generatedSheetMusic;
}