import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LogoutButton from "../../../button/logout/Logout_Button";

import './User_Info.scss';
import LoginModal from "../../../modal/login_modal/Login_modal";
import ModifyModal from "../../../modal/modify_modal/Modify_modal";

const UserInfo = ({ logoutHandler, loginInfo, loginCheck }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const modifyButtonClick = () => {
        setModifyModalOpen(true);
    };

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