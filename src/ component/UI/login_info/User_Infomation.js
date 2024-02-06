import React, {useEffect, useState} from 'react';
import { IoSettingsSharp } from "react-icons/io5";

import './User_Infomaion.scss';
import {getCurrentLoginUser} from "../../util/login-util";
import {CircularProgress} from "@mui/material";
import Login_modal_Button from "../button/login_modal_btn/Login_modal_Button";

const UserInfomation = ({ loginInfo, logoutHandler, googleLogin }) =>
{const [dropdownView, setDropdownView] = useState(false);

    const deleteLoginCookie = () => {
        logoutHandler();
    };
    // const test = () => {
    //     console.log(loginInfo);
    // }

    return (
        <div className="user-info-div">
            {loginInfo
                ? ( // loginInfo가 존재하는 경우에만 렌더링
                <>
                    <img className="imgtest" src={`http://localhost:8484/local${loginInfo.profileImageUrl}`} alt="프로필" />

                    <div className="user-info-subdiv" >
                        <span className="user-info-name">{loginInfo.userName}</span>
                        {
                            loginInfo.auth === 'ADMIN'
                            ? (
                               <span className="downloadCount">관리자 계정</span>
                              )
                            : (
                               <span className="downloadCount">변환기회: {loginInfo.userDownloadChance}</span>
                            )
                        }
                    </div>

                    <span className="user-info-setting" onClick={() => {setDropdownView(!dropdownView)}}><IoSettingsSharp /></span>
                    {dropdownView && (
                        <ul className="dropdown-menu">
                            {/*<li><a className="dropdown-item">마이페이지</a></li>*/}
                            <li onClick={deleteLoginCookie}><a className="dropdown-item logoutTag">로그아웃</a></li>
                        </ul>
                    )}
                </>
            )
            : (
                // loginInfo가 undefined인 경우에 대한 처리
                    <>
                        {
                            !loginInfo && <Login_modal_Button googleLogin={googleLogin} />
                        }
                    </>
                // <img src="/img/write.gif" alt="" />
            )}
        </div>
    );
};

export default UserInfomation;