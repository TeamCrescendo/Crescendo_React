import React, {useEffect, useState} from 'react';
import UserInfomation from "../../login_info/User_Infomation";
import UserTotal from "./user-total/User_Total";

import './MyPage_Loggedin.scss';
import UserInfo from "./user-info/User_Info";
import InquiryInfo from "../../inquiry/Inquiry_Info";
import InquiryButton from "../../button/inquiry_modal_btn/Inquiry_modal_Button";
import MyPageTab from "./mypage-tab/MyPage_Tab";
import {RESTORE_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";

const MyPageLoggedIn = ({ loginInfo, logoutHandler, loginCheck, pageGetter, clickPageGetter }) => {
    const url = loginInfo.profileImageUrl;

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

    return (
        <div className="mypage-loggedin-container">
            <div className="mypageHeader" >
                {/*<UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}/>*/}
            </div>
            <div className="mypageMain" >
                <div className="mypageMain-top">
                    <div className="mypage-info-div">
                        <img className="imgtest" src={url} alt="프로필" />
                        <UserInfo loginInfo={loginInfo} logoutHandler={logoutHandler} loginCheck={loginCheck}/>
                    </div>
                </div>
                <div className="mypageMain-bottom">
                    <MyPageTab loginInfo={loginInfo} pageGetter={pageGetter} clickPageGetter={clickPageGetter}/>


                </div>
            </div>
        </div>
    );
};

export default MyPageLoggedIn;