import React, {useState} from 'react';
import { IoSettingsSharp } from "react-icons/io5";

import './User_Infomaion.scss';

const UserInfomation = ({ loginInfo, logoutHandler }) =>
{const [dropdownView, setDropdownView] = useState(false);

    const deleteLoginCookie = () => {
        logoutHandler();
    };



    return (
        <div className="user-info-div">
            <img className="imgtest" src="img/default_profile.png" alt="프로필 더미" />

            <div className="user-info-subdiv" >
                <span className="user-info-name">{loginInfo.userName}</span>
                <span className="downloadCount">남은 기회: {loginInfo.userDownloadChance}</span>
            </div>

            <span className="user-info-setting" onClick={() => {setDropdownView(!dropdownView)}}><IoSettingsSharp /></span>
            {
                dropdownView && (
                <ul className="dropdown-menu">
                    {/*<li><a className="dropdown-item">마이페이지</a></li>*/}
                    <li onClick={deleteLoginCookie}><a className="dropdown-item logoutTag">로그아웃</a></li>
                </ul>
            )}
        </div>
    );
};

export default UserInfomation;