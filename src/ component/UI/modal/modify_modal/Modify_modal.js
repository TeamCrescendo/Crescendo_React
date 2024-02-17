import React, {useEffect, useRef, useState} from 'react';

import './Modify_modal.scss';
import {GrClose} from "react-icons/gr";
import {FiAlertCircle} from "react-icons/fi";
import RegisterButton from "../../button/register/Register_Button";
import ModifyButton from "../../button/modify/Modify_Button";
import QuitButton from "../../button/quit/Quit_Button";
import {AUTH_URL, MEMBER_URL} from "../../../../config/host-config";
import Form from "react-bootstrap/Form";
import {getCurrentLoginUser} from "../../../util/login-util";


const ModifyModal = ({ onClose, loginInfo, loginCheck, logoutHandler }) => {
    const modalBackground = useRef();
    // const url = loginInfo.profileImageUrl;
    const [profileIMG, setProfileIMG] = useState(loginInfo.profileImageUrl);
    const [imgChange, setImgChange] = useState(false);

    const imgHandler = e => {
        const img = e.target.files[0];
        setProfileIMG(img);
        setImgChange(true);
    }

    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userName: loginInfo.userName,
        password: '',
        password2: '',
        email: loginInfo.email
    });
    // 입력값 검증 메세지를 관리할 상태변수
    const [message, setMessage] = useState({
        userName: " / 변경할 닉네임으로 수정해주세요.",
        password: '',
        password2: '',
        email: " / 변경할 이메일로 수정해주세요."
    });
    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        userName: false,
        password: false,
        password2: false,
        email: false
    });

    // 패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {
        const inputValue = e.target.value;

        let msg, flag;
        if (!inputValue) { // 패스워드 안적은거
            msg = ' / 비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userValue.password !== inputValue) {
            msg = ' / 비밀번호가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = ' / 비밀번호가 일치합니다.';
            flag = true;
        }
        setUserValue({
            ...userValue,
            password2: inputValue
        })
        setMessage({
            ...message,
            password2: msg
        })
        setCorrect({
            ...correct,
            password2: flag
        })
    }

    // 이름 입력값을 검증하고 관리할 함수
    const nameHandler = e => {
        const nameRegex = /^[가-힣]{2,5}$/;
        const inputVal = e.target.value;
        console.log(inputVal)

        let msg, flag; // 검증 메세지를 임시 저장할 지역변수

        if (!inputVal) {
            msg = " / 유저 이름은 필수값입니다!";
            flag = false;
        } else if (!nameRegex.test(inputVal)) {
            msg = " / 2 ~ 5 글자 사이의 한글로 작성";
            flag = false;
        } else {
            fetchDuplicatedCheck("userName", inputVal);
            return;
        }

        setMessage({
            ...message,
            userName: msg
        })
        setCorrect({
            ...correct,
            userName: flag
        })
        setUserValue({
            ...userValue,
            userName: inputVal
        });
    }

    // 이메일 중복체크 비동기통신 (AJAX)
    const fetchDuplicatedCheck = (target, value) => {
        let msg = '', flagg = false;
        fetch(AUTH_URL +"/duplicate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target: target,
                value: value
            }),
        })
            .then(res => res.json())
            .then(flag => {
                switch (target) {
                    case "email":
                        if (flag) {
                            if (value !== loginInfo.email) {
                                msg = ' / 이메일이 중복되었습니다!';
                                flagg = false;
                            } else {
                                msg = ' / 변경할 이메일로 수정해주세요.';
                                flagg = false;
                            }
                        } else {
                            msg = ' / 사용 가능한 이메일입니다.';
                            flagg = true;
                        }
                        setUserValue({...userValue, email: value });
                        setMessage({...message, email: msg });
                        setCorrect({...correct, email: flagg });
                        return;
                    case "userName":
                        if (flag) {
                            if (value !== loginInfo.userName) {
                                msg = ' / 닉네임이 중복되었습니다!';
                                flagg = false;
                            } else {
                                msg = ' / 변경할 닉네임으로 수정해주세요.';
                                flagg = false;
                            }
                        } else {
                            msg = ' / 사용 가능한 닉네임입니다.';
                            flagg = true;
                        }
                        setUserValue({...userValue, userName: value });
                        setMessage({...message, userName: msg });
                        setCorrect({...correct, userName: flagg });
                        return;
                }

            });
    };

    // 이메일 입력값을 검증하고 관리할 함수
    const emailHanlder = e => {
        const inputVal = e.target.value;
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        let msg, flag;
        if (!inputVal) {
            msg = ' / 이메일은 필수값입니다!';
            flag = false;
        } else if (!emailRegex.test(inputVal)) {
            msg = ' / 올바른 이메일 형식이 아닙니다!';
            flag = false;
        } else {
            // 이메일 중복체크
            fetchDuplicatedCheck("email", inputVal);
            return;
        }

        setCorrect({
            ...correct,
            email: flag
        });
        setMessage({
            ...message,
            email: msg
        });

        setUserValue({
            ...userValue,
            email: inputVal
        });
    }

    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHanlder = e => {
        // 패스워드를 입력하면 확인란을 비우기
        document.querySelector('.input-password2').value = '';
        document.querySelector('.check-text').textContent = '';

        setUserValue({
            ...userValue,
            password2: ''
        })
        setMessage({
            ...message,
            password2: ''
        })
        setCorrect({
            ...correct,
            password2: false
        })
        document.querySelector('.input-password2').style.borderColor = 'black';
        document.querySelector('.input-password2').style.outline = 'none';
        document.querySelector('.input-password2').style.borderWidth = '1px';

        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
        // 검증 시작
        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = ' / 비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(e.target.value)) {
            msg = ' / 8글자 이상의 영문,숫자,특수문자를 포함';
            flag = false;
        } else {
            msg = ' / 사용 가능한 비밀번호입니다.';
            flag = true;
        }

        setMessage({
            ...message,
            password: msg
        })
        setCorrect({
            ...correct,
            password: flag
        })

        setUserValue({
            ...userValue,
            password: inputVal
        });
    }

    const handleModalClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };
    // X 버튼을 눌러도 모달이 사라짐
    const modifyClose = e => {
        onClose();
    }

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    // 회원정보 수정 버튼을 눌렀을 때
    const modifySubmit = e => {
        e.preventDefault();
        if (
            userValue.userName === loginInfo.userName && userValue.email === loginInfo.email
            && userValue.password === '' && userValue.password2 === '' && imgChange === false
        ) {
            // 바뀐것없음
            alert("아무것도 변경하지 않았습니다!");
            return;
        }

        const formData = new FormData();
        formData.append('account', loginInfo.account);
        formData.append('userName', userValue.userName);
        formData.append('email', userValue.email);
        formData.append('password', userValue.password);
        if (imgChange) {
            formData.append('profileImage', profileIMG);
        }
        console.log(profileIMG);

        fetch(MEMBER_URL + '/modify', {
            method: 'PATCH',
            headers: headers,
            body: formData,
        })
            .then(response => {
                if (response.status === 200) return response.json();
                else if (response.status === 400) console.log("회원수정 400에러");
            })
            .then(flag => {
                console.log(flag);
                if (flag) {
                    alert("회원정보가 성공적으로 변경되었습니다!");
                    loginCheck();
                    onClose();
                } else {
                    alert("회원정보 변경에 실패했습니다!");
                }
            })
            .catch(error => console.error('Error uploading file:', error));
    }

    // 회원 탈퇴 버튼을 눌렀을 때
    const restoreSubmit = e => {

        e.preventDefault();

        fetch(MEMBER_URL + '/delete', {
            method: 'DELETE',
            headers: requestHeader,
            credentials: 'include',
        })
            .then(res => res.json())
            .then(flag => {
                console.log(flag);
                if (flag) {
                    alert("회원탈퇴가 성공적으로 이루어졌습니다!");
                    logoutHandler();
                    onClose();
                } else {
                    alert("회원탈퇴에 실패했습니다!");
                }
            })

    }

    useEffect(() => {

    }, []);

    const profileClickHandler = () => {
        document.querySelector('.file-upload').click();
    }


    return (
        <div className="modify-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <div className="modify-modal-content">
                <button className="modifyModalCloseBtn" onClick={modifyClose}>
                    <GrClose/>
                </button>
                <div className="modify-modal-title">
                    <h2>회원정보 수정</h2>
                </div>

                <div className="modify-container">
                    <form className="modify-input-form" onSubmit={modifySubmit}>
                        <div className="exDiv">
                            <span>아이디(수정불가)</span>
                        </div>
                        <input
                            type="text"
                            className="input-account"
                            value={loginInfo.account}
                            readOnly={true}
                            style={{color:"gray", background:"lightgray"}}
                        />


                        <div className="exDiv">
                            <span>닉네임
                            <span style={{
                                color: userValue.userName && userValue.userName !== loginInfo.userName ? (correct.userName ? 'green' : 'red') : 'black',
                                fontSize: '14px',
                            }}>{message.userName}</span></span>
                        </div>
                        <input
                            type="text"
                            className="input-nickname"
                            onChange={nameHandler}
                            style={{
                                borderColor: userValue.userName && userValue.userName !== loginInfo.userName ? (correct.userName ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.userName ? '2px' : '1px',
                            }}
                            placeholder={userValue.userName}
                        />


                        <div className="exDiv">
                            <span>이메일
                            <span style={{
                                color: userValue.email && userValue.email !== loginInfo.email ? (correct.email ? 'green' : 'red') : 'black',
                                fontSize: '14px',
                            }}>{message.email}</span></span>
                        </div>
                        <input
                            type="email"
                            className="input-email"
                            onChange={emailHanlder}
                            style={{
                                borderColor: userValue.email && userValue.email !== loginInfo.email ? (correct.email ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.email ? '2px' : '1px',
                            }}
                            placeholder={userValue.email}
                        />


                        <div className="exDiv">
                            <span>변경할 비밀번호
                            <span style={
                                correct.password
                                    ? {color: 'green', fontSize: '14px'}
                                    : {color: 'red', fontSize: '14px'}
                            }>{message.password}</span></span>
                        </div>
                        <input
                            type="password"
                            className="input-password"
                            onChange={passwordHanlder}
                            style={{
                                borderColor: userValue.password ? (correct.password ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.password ? '2px' : '1px'
                            }}
                            placeholder="변경하지 않으려면 공백"
                        />

                        <div className="exDiv">
                            <span>변경할 비밀번호 확인
                            <span className="check-text" style={
                                correct.password2
                                    ? {color: 'green', fontSize: '14px'}
                                    : {color: 'red', fontSize: '14px'}
                            }>{message.password2}</span></span>
                        </div>
                        <input
                            type="password"
                            className="input-password2"
                            onChange={pwCheckHandler}
                            style={{
                                borderColor: userValue.password2 ? (correct.password2 ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.password2 ? '2px' : '1px'
                            }}
                            placeholder="변경하지 않으려면 공백"
                        />
                    </form>
                    <div className="modify-profile-img-container">
                        {
                            imgChange
                                ? <img className="imgtest" onClick={profileClickHandler}
                                       src={URL.createObjectURL(profileIMG)}  alt="프로필"
                                />
                                : <img className="imgtest" onClick={profileClickHandler}
                                       src={profileIMG} alt="프로필"
                                />

                        }
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control className="file-upload" type="file" onChange={imgHandler}/>
                        </Form.Group>
                        {/*<div className="img-title">*/}
                        {/*    프로필 변경*/}
                        {/*</div>*/}
                        <QuitButton restoreSubmit={restoreSubmit}/>
                        <ModifyButton modifySubmit={modifySubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyModal;