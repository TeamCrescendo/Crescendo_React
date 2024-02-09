import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTotal from "../user-total/User_Total";
import InquiryInfo from "../../../inquiry/Inquiry_Info";

import './MyPage_Tab.scss';
import PostMessageInfo from "../../../post_message/Post_Message_Info";
import PlaylistInfo from "../playlist_info/playlist_Info";
import AdminInquiryInfo from "../../../inquiry/forAdmin/Admin_Inquiry_Info";


function MyPageTab({ loginInfo, pageGetter, clickPageGetter }) {

    const userRender = () => {
        return (
            <>
                <Tabs
                    defaultActiveKey="list"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="list" title="공유목록">
                        <UserTotal loginInfo={loginInfo} pageGetter={pageGetter} clickPageGetter={clickPageGetter}/>
                    </Tab>
                    <Tab eventKey="contact" title="플레이리스트">
                        <PlaylistInfo loginInfo={loginInfo}/>
                    </Tab>
                    <Tab eventKey="profile" title="쪽지목록">
                        <PostMessageInfo loginInfo={loginInfo}/>
                    </Tab>
                    <Tab eventKey="longer-tab" title="문의목록">
                        <InquiryInfo loginInfo={loginInfo}/>
                    </Tab>
                </Tabs>
            </>
        );
    }
    const adminRender = () => {
        return (
            <>
                <Tabs
                    defaultActiveKey="longer-tab"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="longer-tab" title="문의목록">
                        <AdminInquiryInfo loginInfo={loginInfo}/>
                    </Tab>
                </Tabs>
            </>
        );
    }


    return (
        <>
            {
                loginInfo.auth === "USER"
                ? userRender()
                : adminRender()

            }
        </>
    );
}

export default MyPageTab;