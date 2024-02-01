import React from 'react';
import UserInfomation from "../../login_info/User_Infomation";
import UserTotal from "./user-total/User_Total";

import './MyPage_Loggedin.scss';
import UserInfo from "./user-info/User_Info";
import InquiryInfo from "../../inquiry/Inquiry_Info";
import InquiryButton from "../../button/inquiry_modal_btn/Inquiry_modal_Button";
import MyPageTab from "./mypage-tab/MyPage_Tab";

const MyPageLoggedIn = ({ loginInfo, logoutHandler, loginCheck }) => {
    const url = loginInfo.profileImageUrl;

    return (
        <div className="mypage-loggedin-container">
            <div className="mypageHeader" >
                {/*<UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}/>*/}
            </div>
            <div className="mypageMain" >
                <div className="mypageMain-top">
                    <div className="mypage-info-div">
                        <img className="imgtest" src={`http://localhost:8484/local${url}`} alt="프로필" />
                        <UserInfo loginInfo={loginInfo} logoutHandler={logoutHandler} loginCheck={loginCheck}/>
                    </div>
                </div>
                <div className="mypageMain-bottom">
                    <MyPageTab loginInfo={loginInfo} />


                </div>
            </div>
        </div>
    );
};

export default MyPageLoggedIn;