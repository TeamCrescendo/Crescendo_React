import React, {useEffect, useState} from 'react';
import './playlist_Info.scss';
import { RiChatDeleteFill } from "react-icons/ri";
import MessageModalButton from "../../../button/message_modal_btn/message_modal_button";
import {getCurrentLoginUser} from "../../../../util/login-util";
import MessageModal from "../../../modal/message_modal/Message_modal";
import PlaylistModalButton from "../../../button/playlist_modal_Button/playlist_modal_Button";
import PlaylistModal from "../../../modal/playlist_modal/Playlist_modal";
import {ALL_PLAYLIST_URL, PLAYLIST_URL} from "../../../../../config/host-config";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddAllPlaylistModal from "../../../modal/add_playlist_modal/Add_AllPlaylist_Modal";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



const PlaylistInfo = ({ loginInfo }) => {
    const [modifyModalOpen, setModifyModalOpen] = useState(false);
    const [addAllPlayModalOpen, setAddAllPlayModalOpen] = useState(false);
    const [data, setData] = useState();
    const [playlistCount, setPlaylistCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [plName, setPlName] = useState();
    const [plShare, setPlShare] = useState();


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

    // const rows = [
    //     createData('감성돋는 1번 리스트', 24, 1),
    //     createData('역동적인 2번 리스트', 5, 2),
    //     // createData('고요한 3번 리스트', 117, 3)
    // ];

    const modifyButtonClick = rowdata => {
        setModifyModalOpen(true);
        setData(rowdata);
    };

    // ALL재생목록 확인
    const selectAllPlaylist = () => {
        fetch(ALL_PLAYLIST_URL, {
            method: 'GET',
            headers: requestHeader,
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json && json.allPlayLists && Array.isArray(json.allPlayLists)) {
                    const updatedRows = json.allPlayLists.map(playlist => {
                        return createData(playlist.plName, playlist.scoreCount, playlist.plId);
                    });
                    setRows(updatedRows);
                } else {
                    console.error("Invalid JSON format or missing 'allPlayLists' array");
                }
            })
    }

    const addPlaylistHandler = e => {
        setAddAllPlayModalOpen(true);
    }

    const deleteAllPlayListHandler = (plId) => {
        if (window.confirm("해당 악보목록을 삭제하시겠습니까?\n저장하신 악보내역은 다시 복구할 수 없습니다!")) {
            deleteAllPlayList(plId);
        }
    }

    const deleteAllPlayList = (plId) => {
        console.log(plId)
        fetch(`${ALL_PLAYLIST_URL}/${plId}`, {
            method: 'DELETE',
            headers: requestHeader
        })
            .then(res => {
                if (res.ok) {
                    alert("악보목록이 성공적으로 삭제되었습니다!");
                    selectAllPlaylist();
                }
                else alert("악보목록 삭제가 실패했습니다!");
            })
    }


    useEffect(() => {
        selectAllPlaylist();
    }, [addAllPlayModalOpen]);
    useEffect(() => {
        selectAllPlaylist();
    }, [modifyModalOpen]);
    useEffect(() => {
        setPlaylistCount(rows.length);
    }, [rows]);

    return (
        <div className="playlist-container">
            <div className="table-container">
                <div className="table-row">
                    <div>악보리스트</div>
                    <div>악보개수</div>
                    <div></div>
                    <div style={{color:"gray", fontWeight:"normal"}}>※ 최대 3개까지 생성가능</div>
                </div>
                <div className="scroll-container">
                    {rows.map((row) => (
                        <div className="table-data" key={row.plId}>
                            <div style={{cursor:"pointer", color:"", fontWeight:"bold"}}>{row.title}</div>
                            <div>{row.scoreCount}개</div>
                            <div>
                                <PlaylistModalButton row={{title: row.title, plId: row.plId}} onClose={() => setModifyModalOpen(false)}
                                                    modifyButtonClick={modifyButtonClick} />
                            </div>
                            <div>
                                {/*<RiChatDeleteFill onClick={() => deleteAllPlayListHandler(row.plId)}*/}
                                {/*                  style={{color:"red", cursor:"pointer", fontSize:"30px"}}/>*/}
                                <IconButton aria-label="delete" size="large" style={{color:"red", cursor:"pointer"}}
                                            onClick={() => deleteAllPlayListHandler(row.plId)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                    {playlistCount < 3 && (
                        <div className="add-playlist">
                            <div className="add-btn" onClick={addPlaylistHandler}>
                                <IoMdAddCircleOutline />
                                {/*<div style={{fontSize:"20px"}}>새로운 악보리스트 생성</div>*/}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {modifyModalOpen && <PlaylistModal loginInfo={loginInfo} data={data}  onClose={() => setModifyModalOpen(false)}/>}
            {addAllPlayModalOpen && <AddAllPlaylistModal loginInfo={loginInfo} data={data}  onClose={() => setAddAllPlayModalOpen(false)}/>}
        </div>
    );
};

export default PlaylistInfo;
