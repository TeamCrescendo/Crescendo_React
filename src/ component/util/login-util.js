
export const TOKEN = 'ACCESS_TOKEN';
export const USERNAME = 'USER_NAME';

// 로그인 여부를 확인하는 함수
export const isLogin = () => !!localStorage.getItem(TOKEN);

// 로그인한 사용자의 데이터를 반환하는 함수
export const getCurrentLoginUser = () => {
    return {
        token: localStorage.getItem(TOKEN),
        username: localStorage.getItem(USERNAME)
    };
}