import React from 'react';
import './WebInfo.scss';
import classNames from "classnames";
import m12 from './img/m12.png';

const WebInfo = ({ isForward }) => {
    const setAnimation = classNames({
        'slide-up': isForward,
        'slide-down': !isForward,
    });

    return (<>
            <header className="head2">
                <h1>
                    Musical Canvas
                </h1>
                <div className={`webinfoContainer ${setAnimation}`}>
                    <h2>
                        <h3 className="h3-title">음악 파일을 악보로 바로 변환, 한번에 즐기기</h3>
                        <span className="span-title"> " Unexpressed emotions through sound, that's what music is! " </span><br/>
                       <p>
                           사용자가 음원 파일을 업로드하면, 빠르고 정확한 변환 알고리즘이 적용되어 즉시 악보로 변환됩니다.<br/>
                           도구를 사용하여 음악 파일을 악보로 변환하고, 빠르게 음악을 이해하며 연주하는 새로운 경험을 즐겨보세요!
                       </p>
                    </h2>
                    <img src={m12} className="img1" alt="instruction1" />
                </div>
            </header>
        </>

    );
};

export default WebInfo;
