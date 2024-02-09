import React, {useEffect, useState} from 'react';
import './User_Total.scss';
import { RiChatDeleteFill } from "react-icons/ri";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ALL_PLAYLIST_URL, BOARD_URL} from "../../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../util/login-util";
import Board from "../../Board/Board";
import ShowDetailModal from "../../../modal/show_detail_modal/Show_Detail_Modal";

const UserTotal = ({ loginInfo }) => {
    const [rows, setRows] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [target, setTarget] = useState();

    function createData(bno, title, like, dislike, viewCount, downloadCount) {
        return { bno, title, like, dislike, viewCount, downloadCount };
    }


    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    // 자신의 공유목록 불러오기
    const selectMyBoard = () => {
        fetch(BOARD_URL + "/myBoardList", {
            method: 'GET',
            headers: requestHeader,
            credentials: 'include',
        })
            .then(res => {
                if(res.ok) return res.json();
            })
            .then(json => {
                console.log(json);
                if (json) {
                    const updatedRows = json.boards.map(board => {
                        return createData(board.boardNo, board.boardTitle, board.boardLikeCount,
                            board.boardDislikeCount, board.boardViewCount, board.boardDownloadCount);
                    });
                    setRows(updatedRows);
                } else {
                    console.error("Invalid JSON format or missing 'allPlayLists' array");
                }
            })
    }

    const deleteHandler = (bno) =>{
        if (!window.confirm("해당 공유악보를 정말 삭제하시겠습니까?")){
            return;
        }

        fetch(`${BOARD_URL}/${bno}`,{
            method:"DELETE",
            headers:{
                'Authorization': 'Bearer ' + token,
                "Content-Type":"application/json"
            }
        }).then(res=> {
            if (res.ok) {
                alert("공유했던 악보가 성공적으로 삭제되었습니다!");
                selectMyBoard();
            }
            else alert("공유악보 삭제가 실패했습니다!");
        })
    }

    useEffect(() => {
        selectMyBoard();
    }, []);

    const moveToTargetHandler = (bno) => {
        setTarget(bno);
        ssd();
    }
    const ssd = () => {
        setShowDetail(true);
    }

    return (
        <div className="user-total-container">
                <div className="table-container">
                <div className="table-row">
                    <div>공유 악보</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                    <div>싫어요</div>
                    <div>다운로드 횟수</div>
                    <div></div>
                </div>
                <div className="scroll-container">
                    {rows.map((row) => (
                        <div className="table-data" key={row.bno}>
                            <div onClick={() => moveToTargetHandler(row.bno)} style={{cursor:"pointer", color:"deepskyblue", fontWeight:"bold"}}>{row.title}</div>
                            <div>{row.viewCount}회</div>
                            <div>{row.like}개</div>
                            <div>{row.dislike}개</div>
                            <div>{row.downloadCount}번</div>
                            {/*<div><RiChatDeleteFill style={{color:"red", cursor:"pointer", fontSize:"30px"}}/></div>*/}
                            <div>
                                <IconButton aria-label="delete" size="large" style={{color:"red", cursor:"pointer"}}
                                onClick={() => deleteHandler(row.bno)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showDetail && <ShowDetailModal onClose={() => setShowDetail(false)} target={target}/>}

        </div>
    );
};

export default UserTotal;
