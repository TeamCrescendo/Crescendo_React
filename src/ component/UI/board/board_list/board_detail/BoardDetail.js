import React, {useEffect, useState} from 'react';
import { GrClose } from "react-icons/gr";
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

const  BoardDetail = ({boardDetailInfo, detailCloseHandler}) => {

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

    // 좋아요 버튼 클릭
    const likeClickHandler = () => {
        setLikeClicked(!likeClicked);
    }
    // 싫어요 버튼 클릭
    const dislikeClickHandler = () => {
        setDislikeClicked(!dislikeClicked);
    }

    // 이미지 우클릭 금지
    // document.querySelector('.detail-img').addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    // });

    return (
        <div className="board-detail-container">
            <div className="document">
                <div className="closeButton" onClick={detailCloseHandler}><IoMdClose/></div>
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
        </div>
    );
};

export default BoardDetail;