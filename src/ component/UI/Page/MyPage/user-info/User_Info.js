import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LogoutButton from "../../../button/logout/Logout_Button";

import './User_Info.scss';
import LoginModal from "../../../modal/login_modal/Login_modal";
import ModifyModal from "../../../modal/modify_modal/Modify_modal";

const UserInfo = ({ logoutHandler, loginInfo }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const modifyButtonClick = () => {
        setModifyModalOpen(true);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>{loginInfo.userName} ({loginInfo.account}) 님</Card.Title>
                <Card.Text>
                    오늘의 다운로드 기회: {loginInfo.userDownloadChance}/5번
                </Card.Text>
                <Button variant="primary" className="info" onClose={() => setModifyModalOpen(false)}
                        onClick={modifyButtonClick}>
                    회원정보 수정
                </Button>
                {modifyModalOpen && <ModifyModal loginInfo={loginInfo} onClose={() => setModifyModalOpen(false)}/>}
                {/*<Button variant="primary">로그아웃</Button>*/}
                <LogoutButton logoutHandler={logoutHandler}/>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;