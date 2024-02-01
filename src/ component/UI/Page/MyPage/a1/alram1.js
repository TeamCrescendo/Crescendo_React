import React, {useState} from 'react';
import {SlClose} from "react-icons/sl";
import './alram1.scss'
const Alram1 = () => {
    const [isModalOpen, setModalOpen] = useState(true);
    const handleClose = () => {
        // 닫기 로직을 여기에 추가하십시오.
        setModalOpen(false);
    };
    return (
        <>
            <div className="card">
                <div className="card-img">
                    {isModalOpen && <div className="card-head">
                        <span className="close-logo" onClick={handleClose}><SlClose/></span>
                        <h4>
                            Alarm
                        </h4>
                        {/*<h3 className="card-title">*/}
                        {/*    앗 잠시만요!*/}
                        {/*</h3>*/}
                    </div>
                    }
                </div>
                <div className="card-main">
                    <br/>
                    <p className="card-text">
                        마이페이지를 볼려면 로그인을 하세요!
                    </p>
                </div>
                <div class="card-footer">
                    <a href="#" className="btn btn-primary" >
                        LOGIN
                    </a>
                    <br/>
                    <a href="#">
                        <span className="join-text">로그인이 없으신가요?</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Alram1;