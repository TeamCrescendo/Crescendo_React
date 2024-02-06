import React, {useEffect, useRef, useState} from 'react';
import {getCurrentLoginUser} from "../../../util/login-util";
import {INQUIRY_URL, PLAYLIST_URL} from "../../../../config/host-config";
import {GrClose} from "react-icons/gr";
import './Playlist_modal.scss';
import InquiryContentModalButton from "../../button/inquirt_content_modal_button/Inquiry_Content_Modal_Button";
import {RiChatDeleteFill} from "react-icons/ri";

const PlaylistModal = ({ onClose, loginInfo, data }) => {
    const modalBackground = useRef();
    const [rows, setRows] = useState([]);
    const [userValue, setUserValue] = useState({
        title: '',
        content: '',
    });

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };

    const[token, setToken] = useState(getCurrentLoginUser().token);
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    function createData(title, plNo, plId, scoreNo) {
        return { title, plNo, plId, scoreNo };
    }

    // 재생목록 확인
    const selectPlaylist = e => {
        fetch(`${PLAYLIST_URL}/${loginInfo.account}/${data.plId}`, {
            method: 'GET',
            headers: requestHeader,
            credentials: 'include',
        })
            .then(res => {
                if(res.ok) return res.json();
                else if(res.status === 400) {
                    alert("플레이리스트조회 400오류!");
                }
            })
            .then(json => {
                console.log("갖고온거: ", json);
                // const updatedRows = json.map(playlist => {
                //     return createData(playlist.title, playlist.plNo, playlist.plId, playlist.scoreNo);
                // });
                // setRows(updatedRows);
            })
    }

    useEffect(() => {
        selectPlaylist();
    }, []);

    return (
        <div className="playlist-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="playlist-modal-content">
                <button className="playlistModalCloseBtn" onClick={onClose}>
                    <GrClose/>
                </button>

                <div className="playlist-modal-title">
                    <h2>재생목록</h2>
                </div>

                <div className="playlist-div">
                    <div className="playlist-content-div">
                        {rows.map((row) => (
                            <div className="table-data" key={row.plNo}>
                                <div> {row.title}</div>
                                {/*<div> {row.plNo}번</div>*/}
                                <hr></hr>
                                {/*<div><RiChatDeleteFill onClick={() => deleteInqHandler(row.inquiryId)} style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>*/}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistModal;