import React from 'react';
import p1 from "../img/p1.png";
import b from "../img/b.png";
import r from "../img/r.png";
import './Form.scss'
const Form1 = () => {
    return (
        <>
            <div className="top" >
                <div className="box" >
                    <div className="box-tool">
                        <br/>
                        <img src={p1} className="img3" alt="instruction1"/>
                    </div>
                    <h1 className="heading">PYTHON</h1>
                    <div className="data">
                        <span className="name">인공지능 & 백엔드</span>
                    </div>
                    <p className="texts">
                        장선경
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={b} className="img2" alt="instruction1"/>
                    </div>
                    <h1 className="heading">BACKEND</h1>
                    <div className="data">
                        <span className="name">백엔드</span>
                    </div>
                    <p className="texts">
                        한태용
                    </p>
                </div>
            </div>
            <div className="bottom">
                <div className="box">
                    <div className="box-tool">
                        <img src={b} className="img2" alt="instruction1"/>
                    </div>
                    <h1 className="heading">BACKEND</h1>
                    <div className="data">
                        <span className="name">백엔드 & 프론트엔드</span>
                    </div>
                    <p className="texts">
                        경규현
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">REACT</h1>
                    <div className="data">
                        <span className="name">프론트엔드</span>
                    </div>
                    <p className="texts">
                        김다빈
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">REACT</h1>
                    <div className="data">
                        <span className="name">프론트엔드</span>
                    </div>
                    <p className="texts">
                        원용재
                    </p>
                </div>
            </div>
        </>
    );
};

export default Form1;