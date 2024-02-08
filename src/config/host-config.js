
const LOCAL_PORT: string = '8484';
const API_BASE_URL: string = 'http://localhost:' + LOCAL_PORT;

const AUTH: string = '/api/auth';
const INQUIRY: string = '/api/inquiry';
const MEMBER: string = '/api/member';
const MESSAGE: string = '/api/message';
const PLAYLIST: string = '/api/playList';
const ALL_PLAYLIST: string = '/api/allPlayList';
const BOARD: string = '/api/board';


export const AUTH_URL: string = API_BASE_URL + AUTH;
export const INQUIRY_URL: string = API_BASE_URL + INQUIRY;
export const MEMBER_URL: string = API_BASE_URL + MEMBER;
export const MESSAGE_URL: string = API_BASE_URL + MESSAGE;
export const PLAYLIST_URL: string = API_BASE_URL + PLAYLIST;
export const ALL_PLAYLIST_URL: string = API_BASE_URL + ALL_PLAYLIST;
export const BOARD_URL: string = API_BASE_URL + BOARD;