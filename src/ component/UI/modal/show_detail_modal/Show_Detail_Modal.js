import React, {useEffect, useRef, useState} from 'react';
import {BOARD_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";
import {Document, Page} from "react-pdf";
import './Show_Detail_Modal.scss';
import {GrClose} from "react-icons/gr";


const ShowDetailModal = ({ target, onClose }) => {
    const [pdfFile, setPdfFile] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const modalBackground = useRef();

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };

    const pdfLoading = () => {
        fetch(`${BOARD_URL}/${target}`, {
            method: 'GET',
            headers: requestHeader
        })
            .then(res => {
                if (res.ok) return res.blob();
            })
            .then(blob => {
                const file = new File([blob], "example.pdf", {type: "application/pdf"});
                setPdfFile(file);
            })

    }

    useEffect(() => {
        if(pdfFile !== undefined){
            setIsLoading(false);
        }
    }, [pdfFile]);

    useEffect(() => {
        pdfLoading();
    }, []);


    return (
        <div className="showPdfContainer"  ref={modalBackground} onClick={handleModalClick}>
            <div className="showPdfContent">
                <button className="pdfModalCloseBtn" onClick={onClose}>
                    <GrClose />
                </button>
                {
                    !isLoading &&
                    (
                        <>
                            <Document file={pdfFile}
                                      className="document">
                                <Page pageNumber={1}/>
                            </Document>
                        </>
                    )
                }
                {
                    isLoading &&
                    (
                        <>
                            <span>로딩중</span>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default ShowDetailModal;