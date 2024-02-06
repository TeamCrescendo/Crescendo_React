import React, {useEffect, useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import Form from "react-bootstrap/Form";
import QuitButton from "../../button/quit/Quit_Button";
import ModifyButton from "../../button/modify/Modify_Button";
import './Add_AllPlaylist_Modal.scss';
import AddAllPlayListButton from "../../button/allplaylist/add_allplaylist_button/Add_AllPlayList_Button";
import {ALL_PLAYLIST_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";

const AddAllPlaylistModal = ({ onClose}) => {
    const modalBackground = useRef();
    const [title, setTitle] = useState("");
    const [isChecked, setIsChecked] = useState(false);


    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    // X 버튼을 눌러도 모달이 사라짐
    const addAllPlaylistClose = e => {
        onClose();
    }

    const titleHandler = e => {
        setTitle(e.target.value);
    }
    const checkHandler = e => {
        setIsChecked(e.target.value);
    }

    const allplaylistSubmit = e => {
        e.preventDefault();

        addAllPlayList();
    }

    // 토큰 가져오기
    const[token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const addAllPlayList = () => {
        console.log(title);
        // console.log(loginInfo.account)
        console.log(isChecked);
        fetch(ALL_PLAYLIST_URL + "/createAllPlayList", {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                plName: title,
                plShare: isChecked,
            }),
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('악보목록 생성에 실패했습니다!');
                }
            })
            .then(data => {
                alert("신규 악보목록을 생성합니다!");
                onClose();
            })
            .catch(error => {
                alert(error.message);
            });

    }



    return (
        <div className="allplaylist-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="allplaylist-modal-content">
                <button className="allplaylistModalCloseBtn" onClick={addAllPlaylistClose}>
                    <GrClose/>
                </button>
                <div className="allplaylist-modal-title">
                    <h2>악보목록 추가</h2>
                </div>

                <div className="allplaylist-container">
                    <form className="allplaylist-input-form" >

                        <div className="exDiv">
                            <span>신규 악보목록 이름
                            <span style={{
                                fontSize: '14px',
                            }}></span></span>
                        </div>
                        <input
                            type="text"
                            className="input-title"
                            onChange={titleHandler}
                            style={{
                            }}
                        />

                        <div className="exDiv">
                            <span style={{marginRight:"5px"}}>공유여부</span>
                            <input type="checkbox" onChange={checkHandler} disabled={true}>

                            </input>
                        </div>

                        <AddAllPlayListButton allplaylistSubmit={allplaylistSubmit}/>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default AddAllPlaylistModal;