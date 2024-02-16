import React from 'react';
import p1 from "../img/p1.png";
import b from "../img/b.png";
import r from "../img/r.png";
import './Form.scss'
const Form1 = () => {
    return (
        <>
                <div className="title1">
                    <h1 className="h1-title">유튜브 영상을 악보로 바로 변환, 한번에 즐기기</h1>
                    <span className="span-title1">
                    " Unexpressed emotions through sound, that's what music is! "
                    </span><br/>
                <p className="p-title1">
                    사용자가 유튜브 링크를 업로드 하면, 파이썬에서 악보 변환 알고리즘이 적용되어 동영상이 악보로 변환됩니다.<br/>
                    AI 음악생성 도구를 이용해 자신만의 음악을 생성하고, 빠르게 음악을 이해하며 연주하는 새로운 경험을 즐겨보세요!
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
                    <h1 className="heading">BACKEND</h1>
                    <div className="data">
                        <span className="name">파이썬 & 스프링</span>
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
                        <span className="name">스프링</span>
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
                        <span className="name">스프링 & 리액트</span>
                    </div>
                    <p className="texts">
                        경규현
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">FRONTEND</h1>
                    <div className="data">
                        <span className="name">리액트</span>
                    </div>
                    <p className="texts">
                        김다빈
                    </p>
                </div>
                <div className="box">
                    <div className="box-tool">
                        <img src={r} className="img1" alt="instruction1"/>
                    </div>
                    <h1 className="heading">FRONTEND</h1>
                    <div className="data">
                        <span className="name">리액트</span>
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