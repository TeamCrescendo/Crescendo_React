import React, { useEffect, useRef, useState } from 'react';
import { IoSettingsSharp } from "react-icons/io5";

import './User_Infomaion.scss';
import { getCurrentLoginUser } from "../../util/login-util";
import { CircularProgress } from "@mui/material";
import Login_modal_Button from "../button/login_modal_btn/Login_modal_Button";

const UserInfomation = ({ loginInfo, logoutHandler, googleLogin }) => {
    const [dropdownView, setDropdownView] = useState(false);
    const dropdownMenuRef = useRef();

    const deleteLoginCookie = () => {
        logoutHandler();
    };

    useEffect(() => {
        // 드롭다운 메뉴 바깥을 클릭해도 드롭다운메뉴가 사라지도록 조치
        const handleOutsideClick = (event) => {
            if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
                setDropdownView(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="user-info-div" style={loginInfo && { paddingRight: "10px", paddingLeft: "10px" }}>
            {loginInfo ? (
                <>
                    <img className="imgtest" src={loginInfo.profileImageUrl} alt="프로필" />

                    <div className="user-info-subdiv">
                        <span className="user-info-name">{loginInfo.userName}</span>
                        {loginInfo.auth === 'ADMIN' ? (
                            <span className="downloadCount">관리자 계정</span>
                        ) : (
                            <span className="downloadCount">변환기회: {loginInfo.userDownloadChance}</span>
                        )}
                    </div>

                    <span className="user-info-setting" onClick={() => { setDropdownView(!dropdownView) }}><IoSettingsSharp /></span>
                    {dropdownView && (
                        <ul className="dropdown-menu" ref={dropdownMenuRef}>
                            <li onClick={deleteLoginCookie}><a className="dropdown-item logoutTag">로그아웃</a></li>
                        </ul>
                    )}
                </>
            ) : (
                <>
                    {!loginInfo && <Login_modal_Button googleLogin={googleLogin} />}
                </>
            )}
        </div>
    );
};

export default UserInfomation;
