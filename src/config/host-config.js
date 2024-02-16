// const LOCAL_PORT = '8484';
// // const LOCAL_PORT: string = '80';
//
// const API_BASE_URL = 'http://localhost/:' + LOCAL_PORT;
// export const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;



// const clientHostName = window.location.hostname;
// console.log('client: ', clientHostName);


// // 버킷 주소
// const S3URL = 'http://todo-bucket9984.s3-website.ap-northeast-2.amazonaws.com/';
// // // 최종 URL
const DEPLOY_BACKEND = 'http://43.200.255.201';
// //
export const API_BASE_URL = DEPLOY_BACKEND;

// let backendHost;
// if (clientHostName === 'localhost') {
//     backendHost = API_BASE_URL;
// } else if (clientHostName === S3URL) {
//     backendHost = DEPLOY_BACKEND;
// }


const AUTH: string = '/api/auth';
const INQUIRY: string = '/api/inquiry';
const MEMBER: string = '/api/member';
const MESSAGE: string = '/api/message';
const PLAYLIST: string = '/api/playList';
const ALL_PLAYLIST: string = '/api/allPlayList';
const BOARD: string = '/api/board';
const SCORE: string = '/api/score';


export const AUTH_URL: string = API_BASE_URL + AUTH;
export const INQUIRY_URL: string = API_BASE_URL + INQUIRY;
export const MEMBER_URL: string = API_BASE_URL + MEMBER;
export const MESSAGE_URL: string = API_BASE_URL + MESSAGE;
export const PLAYLIST_URL: string = API_BASE_URL + PLAYLIST;
export const ALL_PLAYLIST_URL: string = API_BASE_URL + ALL_PLAYLIST;
export const BOARD_URL: string = API_BASE_URL + BOARD;
export const SCORE_URL: string = API_BASE_URL + SCORE;