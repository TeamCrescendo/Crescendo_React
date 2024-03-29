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
        fetch(`${PLAYLIST_URL}?plId=${data.plId}`, {
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
                let num = 0;
                const updatedRows = json.map(playlist => {
                    num = num + 1;
                    return createData(num, playlist.boardTitle, playlist.plNo, playlist.plId, playlist.plAddDateTime);
                });
                setRows(updatedRows);
            })
    }

    const deletePl = (plno) => {
        if (!window.confirm("해당 악보를 악보목록에서 삭제하시겠습니까?")){
            return;
        }

        fetch(PLAYLIST_URL + "/" + plno, {
            method: 'DELETE',
            headers: requestHeader
        })
            .then(res => {
                if (res.ok) {
                    alert("해당 악보가 악보목록에서 삭제되었습니다!");
                    selectPlaylist();
                } else {
                    alert("에러로 인해 삭제되지 않았습니다!");
                }
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
                    <h2>악보목록</h2>
                </div>

                <div className="playlist-div">
                    <div className="playlist-content-div">

                        {rows.map((row) => (
                            <div className="table-data" key={row.plNo}>
                                <div className="list-title">{row.num}. {row.title}</div>
                                <IconButton className="list-btn" aria-label="delete" size="large" onClick={() => deletePl(row.plNo)}
                                            style={{color:"red", cursor:"pointer"}}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistModal;