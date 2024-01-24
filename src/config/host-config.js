
const LOCAL_PORT: string = '8484';
const API_BASE_URL: string = 'http://localhost:' + LOCAL_PORT;

const AUTH: string = '/api/auth';
const INQUIRY: string = '/api/inquiry';
const MEMBER: string = '/api/member';

export const AUTH_URL: string = API_BASE_URL + AUTH;
export const INQUIRY_URL: string = API_BASE_URL + INQUIRY;
export const MEMBER_URL: string = API_BASE_URL + MEMBER;