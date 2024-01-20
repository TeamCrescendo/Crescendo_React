import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LogoutButton from "../../../button/logout/Logout_Button";

import './User_Info.scss';

const UserInfo = ({ logoutHandler, loginInfo }) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{loginInfo.userName} 님</Card.Title>
                <Card.Text>
                    오늘의 다운로드 기회: {loginInfo.userDownloadChance}/5번
                </Card.Text>
                <Button variant="primary" className="info">회원정보 수정</Button>
                {/*<Button variant="primary">로그아웃</Button>*/}
                <LogoutButton logoutHandler={logoutHandler}/>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;