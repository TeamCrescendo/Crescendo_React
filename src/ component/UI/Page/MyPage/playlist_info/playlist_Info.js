import React, {useState} from 'react';
import './playlist_Info.scss';
import { RiChatDeleteFill } from "react-icons/ri";
import MessageModalButton from "../../../button/message_modal_btn/message_modal_button";
import {getCurrentLoginUser} from "../../../../util/login-util";
import MessageModal from "../../../modal/message_modal/Message_modal";
import PlaylistModalButton from "../../../button/playlist_modal_Button/playlist_modal_Button";

const PlaylistInfo = ({ loginInfo }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);
    const [data, setData] = useState();

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    function createData( title, scoreCount, plId ) {
        return { title, scoreCount, plId };
    }

    const rows = [
        createData('1번플리', 24),
        createData('2번플리', 5),
        createData('3번플리', 117)
    ];

    const modifyButtonClick = rowdata => {
        setModifyModalOpen(true);
        setData(rowdata);
    };

    return (
        <div className="playlist-container">
            <div className="table-container">
                <div className="table-row">
                    <div>재생목록</div>
                    <div>악보몇개?</div>
                    <div></div>
                </div>
                <div className="scroll-container">
                    {rows.map((row) => (
                        <div className="table-data" key={row.plId}>
                            <div style={{cursor:"pointer", color:"", fontWeight:"bold"}}>{row.title}</div>
                            <div>{row.scoreCount}개</div>
                            <div>
                                <PlaylistModalButton row={{title: row.title}} onClose={() => setModifyModalOpen(false)}
                                                    modifyButtonClick={modifyButtonClick} />
                            </div>
                            <div><RiChatDeleteFill style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>
                        </div>
                    ))}
                </div>
            </div>
            {modifyModalOpen && <PlaylistModal row={data}  onClose={() => setModifyModalOpen(false)}/>}
        </div>
    );
};

export default PlaylistInfo;
