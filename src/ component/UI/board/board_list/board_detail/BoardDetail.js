import React, {useEffect, useState} from 'react';
import {GrClose} from "react-icons/gr";
import {AiFillDislike, AiFillLike} from "react-icons/ai";

import './BoardDetail.scss';
import {FaHeart, FaRegHeart} from "react-icons/fa6";
import {BsHeartbreak, BsHeartbreakFill} from "react-icons/bs";
import {GiSaveArrow} from "react-icons/gi";
import {MdFormatListBulletedAdd} from "react-icons/md";
import {Document, Page} from "react-pdf";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import {IoMdClose} from "react-icons/io";

const BoardDetail = ({boardDetailInfo, detailCloseHandler, token}) => {

    const [scoreInfo, setScoreInfo] = useState({
        scoreImgUrl: '',
        scoreTitle: '',
        // scoreUploadDateTime: '',
    });

    // 페이지 총 번호
    const [numPages, setNumPages] = useState(0);
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    // 좋아요
    const [likeClicked, setLikeClicked] = useState(false);
    // 싫어요
    const [dislikeClicked, setDislikeClicked] = useState(false);

    const onDocumentLoadSuccess = (document) => {
        setNumPages(document.numPages);
    };

    const pageClickHandler = (event, page) => {
        console.log(page);
        // console.log(event);
        const pageNum = parseInt(page);
        setCurrentPage(pageNum);
    }

    // pdf 파일 다운로드
    const downloadHandler = () => {
        // 사용자로부터 파일 이름 입력 받기 (예: prompt 사용)
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
        setLikeClicked(!likeClicked);
        fetch("http://localhost:8484/api/board/likeAndDislike", {
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
            return res.json()
        }).then(json => {
            console.log(json);
        })
    }

    // 싫어요 버튼 클릭
    const dislikeClickHandler = () => {
        setDislikeClicked(!dislikeClicked);
        fetch("http://localhost:8484/api/board/likeAndDislike", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                boardNo: boardDetailInfo.boardNo,
                like: true
            })
        }).then(res => {
            return res.json()
        }).then(json => {
            console.log(json);
        })
    }

    // 이미지 우클릭 금지
    // document.querySelector('.detail-img').addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    // });


    useEffect(() => {
        console.log(boardDetailInfo);
        console.log()
    }, []);

    return (
        <div className="board-detail-container">
            <div className="detail-header" onClick={detailCloseHandler}><IoMdClose className="close"/></div>
            <div className="detail-title">
                <span className="subTitle">곡명</span>
                <span className="mainTitle">[ {boardDetailInfo.boardTitle} ]</span>
            </div>
            <div className="document-container">
                <div className="document">
                    <Document file={boardDetailInfo.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={currentPage}/>
                    </Document>
                    <Pagination
                        className="pagination"
                        count={numPages}
                        onChange={pageClickHandler}
                        size={"large"}
                    />
                </div>
                <div className="detail-side">
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
                    <MdFormatListBulletedAdd style={{cursor: "pointer"}}/>
                    <GiSaveArrow className="download-btn" style={{cursor: "pointer"}} onClick={downloadHandler}/>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;