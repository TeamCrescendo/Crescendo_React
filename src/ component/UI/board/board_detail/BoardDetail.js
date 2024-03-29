import React, {useEffect, useState} from 'react';
import {GrClose} from "react-icons/gr";
import {AiFillDislike, AiFillLike, AiFillMessage} from "react-icons/ai";

import './BoardDetail.scss';
import {FaHeart, FaRegHeart} from "react-icons/fa6";
import {BsHeartbreak, BsHeartbreakFill} from "react-icons/bs";
import {GiSaveArrow} from "react-icons/gi";
import {MdDelete, MdFormatListBulletedAdd} from "react-icons/md";
import {Document, Page} from "react-pdf";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import {IoMdClose} from "react-icons/io";
import AddAllPlaylistModal from "../../modal/add_playlist_modal/Add_AllPlaylist_Modal";
import BoardDetailModal from "../board_modal/BoardDetailModal";
import {getCurrentLoginUser} from "../../../util/login-util";
import {json} from "react-router-dom";
import BoardMessageModal from "../board_modal/BoardMessageModal";
import {BOARD_URL, MEMBER_URL} from "../../../../config/host-config";
import UserInfomation from "../../login_info/User_Infomation";
import {TbArrowBack} from "react-icons/tb";

const BoardDetail = ({boardDetailInfo, detailCloseHandler, token, scoreNo, memberAccount, loginInfo, getBoard, googleLogin, logoutHandler}) => {


    // 페이지 총 번호
    const [numPages, setNumPages] = useState(0);
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    // 좋아요
    const [likeClicked, setLikeClicked] = useState(false);
    // 싫어요
    const [dislikeClicked, setDislikeClicked] = useState(false);
    // 올플리 악보 띄우기
    const [addAllPlayModalOpen, setAddAllPlayModalOpen] = useState(false);
    // 메세지 모달 띄우기
    const [messageModal, setMessageModal] = useState(false);
    const [account, setAccount] = useState("");


    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const onDocumentLoadSuccess = (document) => {
        setNumPages(document.numPages);
    };

    const pageClickHandler = (event, page) => {
        // console.log(page);
        // console.log(event);
        const pageNum = parseInt(page);
        setCurrentPage(pageNum);
    }

    // pdf 파일 다운로드
    const downloadHandler = () => {
        // 사용자로부터 파일 이름 입력 받기 (예: prompt 사용)
        fetch(BOARD_URL + `/${boardDetailInfo.boardNo}/boardDownLoad`, {
            method:"POST",
            headers:requestHeader,
        }).then(res=>{
            if(res.ok) return res.json();
            if(res.status===500) alert("다운로드 횟수가 부족합니다!");
        }).then(json=>{
            // console.log(json);
        })
        const fileName = prompt('파일 이름을 정해주세요:', 'example.pdf');

        if (fileName) {
            const url = URL.createObjectURL(boardDetailInfo.pdfFile);

            const link = document.createElement('a');
            link.href = url;

            // 사용자가 입력한 파일 이름으로 설정
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };



    // 좋아요 버튼 클릭
    const likeClickHandler = () => {
        if (likeClicked) {
            return;
        }

        if(dislikeClicked){
            setDislikeClicked(!dislikeClicked);
        }
        setLikeClicked(!likeClicked);
        fetch(BOARD_URL + "/likeAndDislike", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                boardNo: boardDetailInfo.boardNo,
                like: true
            })
        }).then(res => {
            return res.text()
        }).then(json => {
            // console.log(json);
        })
    }

    // 싫어요 버튼 클릭
    const dislikeClickHandler = () => {
        if (dislikeClicked) {
            return;
        }
        if(likeClicked){
            setLikeClicked(!likeClicked);
        }
        setDislikeClicked(!dislikeClicked);
        fetch(BOARD_URL + "/likeAndDislike", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                boardNo: boardDetailInfo.boardNo,
                like: false
            })
        }).then(res => {
            return res.text()
        }).then(json => {
            // console.log(json);
        })
    }



    // 삭제 핸들러
    const deleteHandler = () =>{
        if (!window.confirm("해당 악보를 삭제하시겠습니까?")) {
            return;
        }

        console.log("번호: {}", boardDetailInfo.boardNo);
        fetch(`${BOARD_URL}/${boardDetailInfo.boardNo}`,{
            method: "DELETE",
            headers: requestHeader
        }).then(res=> {
            if (res.ok) {
                alert("악보 삭제가 성공했습니다.");
                getBoard();
            } else {
                alert("악보 삭제가 실패했습니다.");
            }
        })
    }

    // 이미지 우클릭 금지
    // document.querySelector('.detail-img').addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    // });


    // 플리 버튼 클릭
    const clickPlayListButtonHandler = () =>{
        setAddAllPlayModalOpen(true);
    }

    // 유저 정보 가져오기
    const getUserInfo = () =>{
        fetch(MEMBER_URL,{
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token},

        }).then(res=>res.json())
            .then(json=>{
                setAccount(json.account);
            })
    }

    // 쪽지 보내기
    const messageHandler = () => {
        console.log("메세지 클릭함");
        setMessageModal(true);
    };

    // 좋아요 싫어요 체크 여부
    const getLikeClickCheck = () =>{
        fetch(BOARD_URL+`/ChecklikeAndDislike?boardNo=${boardDetailInfo.boardNo}`, {
            method:"POST",
            headers: requestHeader
        }).then(res=>res.json())
            .then(json=>{
                console.log(json);
                if(json.isClick){
                    if(json.like){
                        setLikeClicked(true);
                    }else{
                        setDislikeClicked(true);
                    }
                }
            })
    }

    // 조회수 증가
    const upViewCount = () =>{
        fetch(BOARD_URL+`/increaseViewCount?boardNo=${boardDetailInfo.boardNo}`);
    }

    useEffect(() => {
        // console.log(boardDetailInfo);
        // console.log(memberAccount);
        // console.log(scoreNo);
        if(loginInfo!==undefined){
            getUserInfo();
            getLikeClickCheck();
            upViewCount();
        }
    }, []);

    return (
        <div className="board-detail-container">
            <div className="head">
                <UserInfomation googleLogin={googleLogin} logoutHandler={logoutHandler} loginInfo={loginInfo}/>
            </div>
            <div className="detail-title">
                <span className="mainTitle">[ {boardDetailInfo.boardTitle} ]</span>

            </div>
            <div className="document-container">
                <div className="document">
                    <Document className="document-pdf" file={boardDetailInfo.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={currentPage}/>
                    </Document>
                    <Pagination
                        className="pagination"
                        count={numPages}
                        onChange={pageClickHandler}
                        size={"large"}
                    />
                </div>
                {loginInfo!==undefined &&
                <div className="detail-side">
                    <TbArrowBack className="return-btn" style={{cursor:"pointer"}} onClick={detailCloseHandler}/>
                    {
                        likeClicked
                            ?
                            <FaHeart className="like-btn" onClick={likeClickHandler}
                                     style={{cursor: "pointer", color: "red"}}/>
                            : <FaRegHeart className="like-btn" onClick={likeClickHandler}
                                          style={{cursor: "pointer"}}/>
                    }
                    {
                        dislikeClicked
                            ? <BsHeartbreakFill className="dislike-btn" onClick={dislikeClickHandler}
                                                style={{cursor: "pointer", color: "purple"}}/>
                            : <BsHeartbreak className="dislike-btn" onClick={dislikeClickHandler}
                                            style={{cursor: "pointer"}}/>
                    }
                    <MdFormatListBulletedAdd className="addpl-btn" style={{cursor: "pointer"}} onClick={clickPlayListButtonHandler}/>
                    {memberAccount !== account &&  <AiFillMessage className="msg-btn" style={{cursor: "pointer"}} onClick={messageHandler} />}
                    {memberAccount === account && < MdDelete className="del-btn"  style={{cursor: "pointer"}} onClick={deleteHandler} />}
                    {loginInfo.auth === 'ADMIN' && < MdDelete className="del-btn"  style={{cursor: "pointer"}} onClick={deleteHandler} />}
                    <GiSaveArrow className="download-btn" style={{cursor: "pointer"}} onClick={downloadHandler}/>
                </div>
                }
                {loginInfo===undefined &&
                    <>
                        <div className="detail-side">
                            <TbArrowBack className="return-btn" style={{cursor:"pointer"}} onClick={detailCloseHandler}/>
                        </div>
                    </>
                }
            </div>
            {addAllPlayModalOpen && <BoardDetailModal scoreNo={scoreNo} boardNo={boardDetailInfo.boardNo} onClose={() => setAddAllPlayModalOpen(false)}/>}
            {messageModal && <BoardMessageModal createMember={memberAccount} writeAccount={account} onClose={() => setMessageModal(false)}/>}
        </div>
    );
};

export default BoardDetail;