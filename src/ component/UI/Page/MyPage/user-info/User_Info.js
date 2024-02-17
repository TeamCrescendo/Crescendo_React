import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LogoutButton from "../../../button/logout/Logout_Button";

import './User_Info.scss';
import LoginModal from "../../../modal/login_modal/Login_modal";
import ModifyModal from "../../../modal/modify_modal/Modify_modal";
import {RESTORE_URL} from "../../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../util/login-util";

const UserInfo = ({ logoutHandler, loginInfo, loginCheck }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const modifyButtonClick = () => {
        setModifyModalOpen(true);
    };

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const isOnDelete = () => {
        fetch(RESTORE_URL, {
            method: 'GET',
            headers: requestHeader
        })
            .then(res => {
                if (res.ok) {
                    alert("회원탈퇴 처리가 진행중인 계정입니다.\n회원정보 수정에서 취소할 수 있습니다.");
                }
            })
    }

    useEffect(() => {
        isOnDelete();
    }, []);
    useEffect(() => {
        isOnDelete();
    }, [modifyModalOpen]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{loginInfo.userName} {loginInfo.auth !== 'ADMIN' && `(${loginInfo.account})`} 님</Card.Title>
                {
                    loginInfo.auth === 'ADMIN'
                    ? (<Card.Text>
                         환영합니다 관리자님!
                    </Card.Text>)
                    : (<Card.Text>
                            오늘의 변환 기회: {loginInfo.userDownloadChance}/5번
                    </Card.Text>)
                }
                <Button variant="primary" className="info" onClose={() => setModifyModalOpen(false)}
                        onClick={modifyButtonClick} style={{marginTop:"20px"}}>
                    회원정보 수정
                </Button>
                {modifyModalOpen && <ModifyModal logoutHandler={logoutHandler} loginInfo={loginInfo} loginCheck={loginCheck} onClose={() => setModifyModalOpen(false)}/>}
                {/*<Button variant="primary">로그아웃</Button>*/}
                <LogoutButton logoutHandler={logoutHandler}/>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;