import React from 'react';
import p1 from "../img/p1.png";
import b from "../img/b.png";
import r from "../img/r.png";
import './Form.scss'
const Form1 = () => {
    return (
        <>
            {/*<h2>*/}
            {/*</h2>*/}
            <div className="top" >
                <div className="box" >
                    <div className="box-tool">
                        <br/>
                        <img src={p1} className="img3" alt="instruction1"/>
                    </div>
                    <h1 className="heading">PYTHON</h1>
                    <div className="data">
                        <span className="name">인공지능</span>
                    </div>
                    <p className="texts">
                        J
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={b} className="img2" alt="instruction1"/>
                    </div>
                    <h1 className="heading">BACKEND</h1>
                    <div className="data">
                        <span className="name">on</span>
                    </div>
                    <p className="texts">
                        abc
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
                        <span className="name">백엔드</span>
                    </div>
                    <p className="texts">
                        abc
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">REACT</h1>
                    <div className="data">
                        <span className="name">abc</span>
                    </div>
                    <p className="texts">
                        abc
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">REACT</h1>
                    <div className="data">
                        <span className="name">Won</span>
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