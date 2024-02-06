import React, {useEffect, useRef, useState} from 'react';
import {getCurrentLoginUser} from "../../../util/login-util";
import {INQUIRY_URL, PLAYLIST_URL} from "../../../../config/host-config";
import {GrClose} from "react-icons/gr";
import './Playlist_modal.scss';
import InquiryContentModalButton from "../../button/inquirt_content_modal_button/Inquiry_Content_Modal_Button";
import {RiChatDeleteFill} from "react-icons/ri";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

    function createData(num, title, plNo, plId, time) {
        return { num, title, plNo, plId, time };
    }

    // 재생목록 확인
    const selectPlaylist = e => {
        fetch(PLAYLIST_URL, {
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
                let num = 0;
                const updatedRows = json.map(playlist => {
                    num = num + 1;
                    console.log(playlist.title);
                    return createData(num, playlist.scoreNoTitle, playlist.plNo, playlist.plId, playlist.plAddDateTime);
                });
                setRows(updatedRows);
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
                                {/*<div>{row.num}</div>*/}
                                <div>{row.num}: {row.title}</div>
                                {/*<div> {row.plNo}번</div>*/}
                                <IconButton aria-label="delete" size="large" style={{color:"red", cursor:"pointer"}}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
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