import './TeamInfo.scss';
import classNames from "classnames";
import React from "react";
import r from './img/r.png';
import b from './img/b.png';
import p from './img/p.png';
const TeamInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (
        <header className="head1">
            <h1>
                Beethoven Tomato Deluxe
            </h1>
            <div className={`teaminfoContainer ${setAnimation}`}>
                <h2>
                   <p>팀 소개 페이지 입니다!</p>
                    음악을 더 풍부하게 즐기기 위해 음원을 악보로 변환하는 고급 음악 변환 사이트를 개발하는 팀입니다.<br/>
                </h2>
                <div className="contenitore">
                    <div className="card">
                        <div className="card__text">
                            React
                        </div>
                        <img src={r} className="img1" alt="instruction1" />
                    </div>

                </div>
                <div className="contenitore">
                    <div className="card">
                        <div className="card__text">
                            Backend
                        </div>
                        <img src={b} className="img2" alt="instruction1" />
                    </div>

                </div>
                <div className="contenitore">
                    <div className="card">
                        <div className="card__text">
                            Python
                        </div>
                            <img src={p} className="img3" alt="instruction1" />
                    </div>
                </div>
            </div>

        </header>

    );
};
export default TeamInfo;
