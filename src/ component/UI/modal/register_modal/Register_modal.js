import React, {useRef, useState} from 'react';

import './Register_modal.scss';
import {GrClose} from "react-icons/gr";
import { FiAlertCircle } from "react-icons/fi";
import LoginButton from "../../button/login/original_login/Login_Button";
import KakaoLoginButton from "../../button/login/kakao_login/Kakao_Login_Button";
import RegisterButton from "../../button/register/Register_Button";
import {AUTH_URL} from "../../../../config/host-config";
import Form from 'react-bootstrap/Form';
import {getCurrentLoginUser} from "../../../util/login-util";


const RegisterModal = ({ onClose }) => {
    const modalBackground = useRef();
    const [profileIMG, setProfileIMG] = useState('img/default_profile.png');
    const [isChange, setIsChange] = useState(false);

    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        account: '',
        userName: '',
        password: '',
        password2: '',
        email: ''
    });
    // 입력값 검증 메세지를 관리할 상태변수
    const [message, setMessage] = useState({
        account: '',
        userName: '',
        password: '',
        password2: '',
        email: ''
    });
    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        account: false,
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

    // 계정 입력값을 검증하고 관리할 함수
    const accountHandler = e => {
        const accountRegex = /^[a-zA-Z]{2,10}$/;
        const inputVal = e.target.value;

        let msg, flag; // 검증 메세지를 임시 저장할 지역변수
        if (!inputVal) {
            msg = " / 아이디는 필수값입니다!";
            flag = false;
        } else if (!accountRegex.test(inputVal)) {
            msg = " / 2 ~ 10 글자 사이의 영어로 작성";
            flag = false;
        } else {
            fetchDuplicatedCheck("account", inputVal);
            return;
            // msg = "사용 가능한 아이디입니다.";
            // flag = true;
        }

        setMessage({
            ...message,
            account: msg
        })
        setCorrect({
            ...correct,
            account: flag
        })

        setUserValue({
            ...userValue,
            account: inputVal
        });
    }

    // 이름 입력값을 검증하고 관리할 함수
    const nameHanlder = e => {
        const nameRegex = /^[가-힣]{2,5}$/;
        const inputVal = e.target.value;

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
            // msg = "사용 가능한 이름입니다.";
            // flag = true;
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
                            msg = ' / 이메일이 중복되었습니다!';
                            flagg = false;
                        } else {
                            msg = ' / 사용 가능한 이메일입니다.';
                            flagg = true;
                        }
                        setUserValue({...userValue, email: value });
                        setMessage({...message, email: msg });
                        setCorrect({...correct, email: flagg });
                        return;
                    case "account":
                        if (flag) {
                            msg = ' / 아이디가 중복되었습니다!';
                            flagg = false;
                        } else {
                            msg = ' / 사용 가능한 아이디입니다.';
                            flagg = true;
                        }
                        setUserValue({...userValue, account: value });
                        setMessage({...message, account: msg });
                        setCorrect({...correct, account: flagg });
                        return;
                    case "userName":
                        if (flag) {
                            msg = ' / 닉네임이 중복되었습니다!';
                            flagg = false;
                        } else {
                            msg = ' / 사용 가능한 닉네임입니다.';
                            flagg = true;
                        }
                        setUserValue({...userValue, userName: value });
                        setMessage({...message, userName: msg });
                        setCorrect({...correct, userName: flagg });
                        return;
                    default:
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
    const registerClose = e => {
        onClose();
    }

    // const registerSubmit = e => {
    //     e.preventDefault();
    //     if (!correct.account || !correct.userName || !correct.password || !correct.password2 || !correct.email) {
    //         return;
    //     }
    //
    //     fetch(`${URL}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: JSON.stringify({
    //             account: userValue.account,
    //             userName: userValue.userName,
    //             email: userValue.email,
    //             password: userValue.password,
    //             profileImage: profileIMG
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             // 로그인 검증 메서드
    //             if (json === true) {
    //                 alert("회원가입이 성공적으로 처리되었습니다!");
    //                 onClose();
    //             } else {
    //                 alert("회원가입에 실패했습니다!");
    //             }
    //         })
    // }

    const[token, setToken] = useState(getCurrentLoginUser().token);
    const headers = {
        'Authorization': 'Bearer ' + token,
    };
    const registerSubmit = () => {
        const formData = new FormData();
       if(isChange){
        formData.append('profileImage', profileIMG);}

        formData.append('account', userValue.account);
        formData.append('userName', userValue.userName);
        formData.append('email', userValue.email);
        formData.append('password', userValue.password);

        fetch('http://localhost:8484/api/auth/register', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.status === 200) return response.json();
                else if (response.status === 400) console.log("회원가입 400오류");
            })
            .then(data => {
                console.log(data);
                onClose();
            })
            .catch(error => console.error('Error uploading file:', error));
    };

    const imgHandler = e => {
        console.log(e.target);
        const img = e.target.files[0];

        setProfileIMG(img);
        setIsChange(true);
    }







    return (
        <div className="register-modal-container" ref={modalBackground} onClick={handleModalClick}>
            <form className="register-modal-content" onSubmit={registerSubmit}>
                <button className="registerModalCloseBtn" onClick={registerClose}>
                    <GrClose />
                </button>
                <div className="register-modal-title">
                    <h2>크레센도 회원가입</h2>
                </div>

                <div className="register-div">
                    <div className="register-input-container">
                        <div className="exDiv">
                            <span className="red">*</span><span>아이디
                            <span style={
                            correct.account
                                ? {color: 'green', fontSize: '14px'}
                                : {color: 'red', fontSize: '14px'}
                        }>{message.account}</span></span>
                        </div>
                        <input
                            type="text"
                            className="input-account"
                            onChange={accountHandler}
                            style={{
                                borderColor: userValue.account ? (correct.account ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.account ? '2px' : '1px'
                            }}
                            maxLength={10}
                        />


                        <div className="exDiv">
                            <span className="red">*</span><span>닉네임
                            <span style={
                            correct.userName
                                ? {color: 'green', fontSize: '14px'}
                                : {color: 'red', fontSize: '14px'}
                        }>{message.userName}</span></span>
                        </div>
                        <input
                            type="text"
                            className="input-nickname"
                            onChange={nameHanlder}
                            style={{
                                borderColor: userValue.userName ? (correct.userName ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.userName ? '2px' : '1px'
                            }}
                        />


                        <div className="exDiv">
                            <span className="red">*</span><span>이메일
                            <span style={
                            correct.email
                                ? {color: 'green', fontSize: '14px'}
                                : {color: 'red', fontSize: '14px'}
                        }>{message.email}</span></span>
                        </div>
                        <input
                            type="email"
                            className="input-email"
                            onChange={emailHanlder}
                            style={{
                                borderColor: userValue.email ? (correct.email ? 'green' : 'red') : 'black',
                                outline: 'none',
                                borderWidth: userValue.email ? '2px' : '1px'
                            }}
                        />


                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호
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
                        />

                        <div className="exDiv">
                            <span className="red">*</span><span>비밀번호 확인
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
                        />

                    </div>
                    <div className="register-profile-img-container">
                        {
                            isChange
                            ? <img className="imgp" src={URL.createObjectURL(profileIMG)} alt="프로필 사진"/>
                            : <img className="imgp" src={profileIMG} alt="프로필 사진"/>
                        }
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" onChange={imgHandler}/>
                        </Form.Group>
                        {/*<div className="img-title">*/}
                        {/*    프로필 사진*/}
                        {/*</div>*/}
                        <RegisterButton registerSubmit={registerSubmit}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterModal;