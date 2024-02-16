import React, {useEffect, useRef, useState} from 'react';
import {GrClose} from "react-icons/gr";
import Form from "react-bootstrap/Form";
import QuitButton from "../../button/quit/Quit_Button";
import ModifyButton from "../../button/modify/Modify_Button";
import './BoardDetailModal.scss';
import AddAllPlayListButton from "../../button/allplaylist/add_allplaylist_button/Add_AllPlayList_Button";
import {ALL_PLAYLIST_URL, PLAYLIST_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../util/login-util";
import {IoMdAddCircleOutline} from "react-icons/io";

const BoardDetailModal = ({onClose, scoreNo, boardNo}) => {
    const modalBackground = useRef();
    const [title, setTitle] = useState("");
    // 눌렀는지 풀었는지
    const [isChecked, setIsChecked] = useState(false);
    const [buttonName, setButtonName] = useState("선택하기");
    // 체크 버튼 누른거 확인
    const [onCount, setOnCount] = useState(0);
    const [duplicateList, setDuplicateList] = useState([]);
    // 플리 새로만들건지 확인
    const [wantNew , setWantNew] = useState(false);

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

    }



    useEffect(() => {
        console.log(onCount);
        if (onCount === 0) {
            setButtonName("선택하기");
        }
        else if (onCount >= 1) {
            setButtonName("추가하기");
        }
    }, [onCount]);

    const allplaylistSubmit = e => {
        e.preventDefault();
        if (buttonName === "생성하기" && playList.length < 3) {
            addAllPlayList();
        } else {
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
        let allRequests = [];

        sendPlayList.forEach((item) => {
            const requestPromise = fetch(PLAYLIST_URL, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    boardNo: boardNo,
                    plId: item,
                    scoreNo: scoreNo
                })
            });
            allRequests.push(requestPromise);
        });

        Promise.all(allRequests)
            .then(responses => {
                const allSucceeded = responses.every(res => res.ok);
                if (allSucceeded) {
                    alert("악보목록에 추가되었습니다!");
                    onClose();
                } else {
                    alert("오류로 인해 목록에 추가하지 못했습니다.");
                }
            })
            .catch(error => {
                alert("악보 추가 중 오류가 발생했습니다.");
            });
    };

    // 올 플리 만드는 함수
    const addAllPlayList = () => {
        if(title === ""){
            alert("플레이리스트 악보이름을 정해주세요!!");
            return;
        }

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

    // 올 플리 가져오기
    const getAllPlay = () =>{
        fetch(ALL_PLAYLIST_URL, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.status ===200){
                    return res.json();
                }else{

                }
            })
            .then(
                json => {
                    if (json.allPlayLists.length >= 3) {
                    }
                    setPlayList([...json.allPlayLists]);

                    setLoading(true);
                }
            )
    }

    // 플리이리스트 중복여부 체크
    useEffect(() => {
        if (playList.length !== 0) {

            const list = playList.map(item =>({
                plId: item.plId,
                scoreNo: scoreNo
            }))

            fetch(PLAYLIST_URL + "/duplicate", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    list
                })  // 수정된 부분
            }).then(res => res.json())
                .then(json => {
                    // console.log("중복 여부: ", json);
                    setDuplicateList([...json]);
                });
        }
    }, [playList]);

    // 중복 체크 까지 함

    // 자신의 올 플리 가져오는 useEffect
    useEffect(() => {
        getAllPlay();


    }, []);



    const addbtnHandler = () => {
        setWantNew(!wantNew);
        setButtonName("생성하기");
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
                    <form className="allplaylist-input-form">
                        {
                            wantNew &&
                            (
                                <>
                                    <div className="exDiv">
                                        <span>신규 악보목록 이름
                                            <span style={{fontSize: '14px',}}></span>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="input-title"
                                        onChange={titleHandler}
                                        style={{}}
                                    />
                                </>
                            )
                        }

                        {
                            !wantNew &&
                            <div className="my-playlist">{playList.length > 0 ? "나의 플레이리스트" :"플레이리스트가 없습니다"}</div>
                        }
                        {
                            loading && playList.map((item, i) =>
                                (
                                    <>
                                        {
                                            !wantNew &&
                                            <div className="playlist-item">
                                                <div style={{display: "none"}}>{item.plId}</div>
                                                <div className="plName2">{item.plName}</div>
                                                <input className="plName-check2" type="checkbox" onChange={checkHandler}
                                                       disabled={duplicateList[i]}>
                                                </input>
                                            </div>
                                        }
                                    </>
                                ))
                        }

                        {
                            playList.length < 3 &&
                            <div className="add-playlist">
                                <div className="add-btn" onClick={addbtnHandler}>
                                    <IoMdAddCircleOutline />
                                </div>
                            </div>
                        }

                        {
                            !wantNew &&
                            (
                                <>
                                    {
                                        buttonName === "선택하기" &&
                                        <button className="addallplaylist-btn" type="button"
                                                style={{background:"gray"}}>
                                            {buttonName}
                                        </button>
                                    }
                                    {
                                        buttonName === "추가하기" &&
                                        <button className="addallplaylist-btn" type="button" onClick={allplaylistSubmit}>
                                            {buttonName}
                                        </button>
                                    }
                                </>
                            )
                        }

                        {
                            wantNew &&
                            <button className="addallplaylist-btn" type="button" onClick={allplaylistSubmit}>
                                {buttonName}
                            </button>
                        }


                    </form>


                </div>
            </div>
        </div>
    );
};

export default BoardDetailModal;