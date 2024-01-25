import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTotal from "../user-total/User_Total";
import InquiryInfo from "../../../inquiry/Inquiry_Info";

import './MyPage_Tab.scss';
import PostMessageInfo from "../../../post_message/Post_Message_Info";


function MyPageTab({ loginInfo }) {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="list" title="공유목록">
                <UserTotal />
            </Tab>
            <Tab eventKey="profile" title="쪽지목록">
                <PostMessageInfo loginInfo={loginInfo}/>
            </Tab>
            <Tab eventKey="longer-tab" title="문의목록">
                <InquiryInfo loginInfo={loginInfo}/>
            </Tab>
            <Tab eventKey="contact" title="공란" disabled>
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}

export default MyPageTab;