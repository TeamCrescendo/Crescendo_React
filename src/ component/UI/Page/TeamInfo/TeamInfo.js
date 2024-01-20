import './TeamInfo.scss';
import classNames from "classnames";

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
                    음악을 더 풍부하게 즐기기 위해 음원을 악보로 변환하는 고급 음악 변환 사이트를 개발하는 팀입니다.
                </h2>
            </div>
        </header>

    );
};
export default TeamInfo;
