import React from 'react';
import p1 from "../img/p1.png";
import b from "../img/b.png";
import r from "../img/r.png";
import './Form.scss'
const Form1 = () => {
    return (
        <>

                <div className="title1">
                    <h1 className="h1-title">음악 파일을 악보로 바로 변환, 한번에 즐기기</h1>
                    <span className="span-title1">
                    " Unexpressed emotions through sound, that's what music is! "
                    </span><br/>
                    <p className="p-title1">
                        사용자가 음원 파일을 업로드하면, 빠르고 정확한 변환 알고리즘이 적용되어 즉시 악보로 변환됩니다.<br/>
                        도구를 사용하여 음악 파일을 악보로 변환하고, 빠르게 음악을 이해하며 연주하는 새로운 경험을 즐겨보세요!
                    </p>
                </div>
            <div className="title3">
                <h2 className="h3-title">TEAM</h2>
            </div>
            <div className="top">
                <div className="box">
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