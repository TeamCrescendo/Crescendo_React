import React, {useState} from 'react';
import {getCurrentLoginUser} from "../../../util/login-util";
import {MEMBER_URL} from "../../../../config/host-config";
import './PwChangeButton.scss';

const PwChangeButton = ({ onClose, account, email, newPassword }) => {
    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    const pwChangeHandler = e => {
        fetch(MEMBER_URL + "/modifyPassword", {
            method: 'PUT',
            headers: requestHeader,
            body: JSON.stringify({
                account: account,
                email: email,
                password: newPassword
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("비밀번호 변경이 성공했습니다!");
                    onClose();
                } else {
                    alert("비밀번호 변경이 실패했습니다!");
                    onClose();
                }
            })
    }

    return (
        <button className="changeBtn" type="button" onClick={pwChangeHandler}>비밀번호 변경</button>
    );
};

export default PwChangeButton;