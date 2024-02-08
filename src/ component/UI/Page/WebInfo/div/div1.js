import React from 'react';
import pp1 from "../img/pp1.png";
import pp2 from "../img/pp2.png";
import u3 from "../img/u3.png";
import './div1.scss';

const Div1 = () => {
    return (
        <>
            <div className="c1-1">
                <img src={pp1} className="imgi1" alt="사진1"/>
                <div className="c1-2">
                    <p className="ctext">
                        이론을 학습하거나 연습할 때<br/>
                        음원 파일을 악보로 변환하여<br/>
                        더 효과적인 학습을 경험하세요!
                    </p>
                </div>
            </div>

            <div className="c2-1">
                <img src={pp2} className="imgi2" alt="사진2"/>
                <div className="c2-2">
                    <p className="ctext2">
                        사용자가 원하는 음악 수준에 맞게<br/>
                        다양한 맞춤 설정으로<br/>
                        악보를 자유롭게 조절하세요!
                    </p>
                </div>
            </div>

            <div className="c3-1">
                <img src={u3} className="imgi3" alt="사진3"/>
                <div className="c3-2">
                    <p className="ctext3">
                        이론을 학습하거나 연습할 때<br/>
                        음원 파일을 악보로 변환하여<br/>
                        더 효과적인 학습을 경험하세요!
                    </p>
                </div>
            </div>
        </>
    );
};

export default Div1;