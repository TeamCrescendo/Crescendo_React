import React, {useState} from 'react';
import {MEMBER_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";

const UserCheckButton = ({ oncheck, account, email}) => {

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const userCheckHandler = (account, email) => {
        if (account === null || email === null) {
            return;
        }

        fetch(MEMBER_URL + "/verifyEmail", {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                account : account,
                email : email
            })
        })
            .then(res => {
                if (res.ok) {
                    oncheck();
                } else {
                    alert("회원정보를 찾을 수 없습니다!");
                }
            })
    }
    return (
        <button type="button" onClick={() => userCheckHandler(account, email)}>회원정보 확인</button>
    );
};

export default UserCheckButton;