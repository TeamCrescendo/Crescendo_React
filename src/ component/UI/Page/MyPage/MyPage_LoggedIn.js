import React from 'react';
import UserInfomation from "../../login_info/User_Infomation";
import UserTotal from "./user-total/User_Total";



const MyPageLoggedIn = ({ loginInfo, logoutHandler }) => {

    return (
        <>
            <div className="mypageHeader" >
                <UserInfomation loginInfo={loginInfo} logoutHandler={logoutHandler}/>
            </div>
            <div className="mypageMain" >
                <div className="mypageMain-top">

                </div>
                <div className="mypageMain-bottom">
                    <UserTotal />
                </div>
            </div>
        </>
    );
};

export default MyPageLoggedIn;