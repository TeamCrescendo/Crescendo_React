import React, {useEffect, useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import Form from "react-bootstrap/Form";
import QuitButton from "../../button/quit/Quit_Button";
import ModifyButton from "../../button/modify/Modify_Button";
import './BoardDetailModal.scss';
import AddAllPlayListButton from "../../button/allplaylist/add_allplaylist_button/Add_AllPlayList_Button";
import {ALL_PLAYLIST_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";

const BoardDetailModal = ({onClose, scoreNo}) => {
    const modalBackground = useRef();
    const [title, setTitle] = useState("");
    // 눌렀는지 풀었는지
    const [isChecked, setIsChecked] = useState(false);
    const [buttonName, setButtonName] = useState("생성하기");
    // 체크 버튼 누른거 확인
    const [onCount, setOnCount] = useState(0);

    const account = getCurrentLoginUser().username;

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    // 서버로 보내야할 플레이리스트
    const [sendPlayList, setSendPlayList] = useState([]);

    // 내가 가진 플레이리스트 목록
    const [playList, setPlayList] = useState([]);

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
    // 플리 체크 하는 함수
    const checkHandler = e => {
        if (e.target.checked) {
            const a = e.target.parentNode.firstChild.textContent;
            setSendPlayList([...sendPlayList, a]);
            setOnCount(onCount + 1);
        } else {
            const b = e.target.parentNode.firstChild.textContent;
            const indexToRemove = sendPlayList.findIndex(item => item === b);

            if (indexToRemove !== -1) {
                const updatedPlayList = [...sendPlayList];
                updatedPlayList.splice(indexToRemove, 1);
                setSendPlayList(updatedPlayList);
            }
            setOnCount(onCount - 1);
        }
        // console.log(isChecked);
        // console.log(e.target.value);
        // setButtonName("추가하기");
        // setIsChecked(e.target.value);
    }


    // 체크 하는거 에 따른 이름 변경
    useEffect(() => {
        if (onCount === 0 && playList.length < 3) {
            setButtonName("생성하기");
        } else {
            setButtonName("추가하기");
        }
    }, [onCount]);

    const allplaylistSubmit = e => {
        e.preventDefault();
        if (buttonName === "생성하기" && playList.length < 3) {
            console.log("생성하기가 실행함")
            addAllPlayList();
        } else {
            console.log("추가하기가 실행함");
            if (onCount === 0) {
                alert("체크 해주세요");
                return;
            } else {
                send();
            }
        }
    }

    // 플리 추가하는 함수
    const send = () => {
        console.log(sendPlayList);
        console.log(scoreNo);
        sendPlayList.forEach((item) => {
            fetch("http://localhost:8484/api/playList", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    account: "member5",
                    plId: item,
                    scoreNo: scoreNo
                })
            }).then(res => res.json())
                .then(json => {
                    console.log(json);
                })
        })

    }

    // 올 플리 만드는 함수
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

    const [loading, setLoading] = useState(false);

    // 자신의 올 플리 가져오는 useEffect
    useEffect(() => {
        fetch("http://localhost:8484/api/allPlayList", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(
            json => {
                console.log(json.allPlayLists);
                if (json.allPlayLists.length >= 3) {
                    setButtonName("추가하기");
                }
                setPlayList([...json.allPlayLists]);

                setLoading(true);
            }
        )
    }, []);

    // 올 플리 가져온 후에 이미 넣은 보드 인지 확인하는 함수
    // useEffect(() => {
    //     if(playList.length!==0){
    //         playList.forEach((item)=>{
    //             item.plId
    //         })
    //
    //     }

    // }, [playList]);

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
                    <form className="allplaylist-input-form">

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
                            style={{}}
                        />
                        <div className="exDiv">
                            <span style={{marginRight: "5px"}}>공유여부</span>
                            <input type="checkbox" onChange={checkHandler} disabled={true}>

                            </input>
                        </div>
                        <div className="my-playlist">나의 플레이리스트</div>
                        {
                            loading && playList.map((item) =>
                                (
                                    <div className="playlist-item">
                                        <div style={{display: "none"}}>{item.plId}</div>
                                        <div className="plName2">{item.plName}</div>
                                        <input className="plName-check2" type="checkbox" onChange={checkHandler}
                                               disabled={false}>

                                        </input>
                                    </div>
                                ))
                        }
                        <button className="addallplaylist-btn" type="submit" onClick={allplaylistSubmit}>
                            {buttonName}
                        </button>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default BoardDetailModal;