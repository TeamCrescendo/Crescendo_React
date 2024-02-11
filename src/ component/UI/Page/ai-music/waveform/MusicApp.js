import { useEffect, useRef, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiFillSound } from "react-icons/ai";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import './MusicApp.scss';
import WaveForm from "./WaveForm";

export default function MusicApp({ url }) {
    const [audioUrl, setAudioUrl] = useState();
    const [analyzerData, setAnalyzerData] = useState(null);
    const [audio, setAudio] = useState(null);
    const audioElmRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(null);

    const handleToggleMute = () => {
        if (muted) {
            setMuted(false); // 음소거 해제
            if (prevVolume !== null) {
                setVolume(prevVolume); // 이전 볼륨으로 설정
                audio.volume = prevVolume; // 실제 오디오 요소의 볼륨 변경
            }
        } else {
            setPrevVolume(volume); // 이전 볼륨 저장
            setVolume(0); // 볼륨을 0으로 설정
            setMuted(true); // 음소거 상태로 변경
            audio.volume = 0; // 실제 오디오 요소의 볼륨 변경
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        audio.volume = newVolume; // 실제 오디오 요소의 볼륨 변경
        if (newVolume === 0) {
            setMuted(true); // 볼륨이 0이면 음소거 상태로 변경
        } else {
            setMuted(false); // 볼륨이 0이 아니면 음소거 상태를 해제
        }
    };

    const audioAnalyzer = () => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyzer = audioCtx.createAnalyser();
        analyzer.fftSize = 2048;

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const source = audioCtx.createMediaElementSource(audioElmRef.current);
        source.connect(analyzer);
        source.connect(audioCtx.destination);
        source.onended = () => {
            setIsPlaying(false);
        };

        setAnalyzerData({ analyzer, bufferLength, dataArray });
    };

    useEffect(() => {
        setAudioUrl(url);
        audioAnalyzer();
    }, []);

    useEffect(() => {
        if (audioElmRef.current) {
            setAudio(audioElmRef.current);
        }
    }, [audioElmRef.current]);

    useEffect(() => {
        if (audio) {
            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [audio]);

    useEffect(() => {
        if (audio) {
            audio.onended = () => {
                setIsPlaying(false); // 오디오 재생이 종료될 때 상태 변경
            };
        }
    }, [audio]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    };

    const handleSeek = (event) => {
        if (audio) {
            audio.currentTime = event.target.value;
            setCurrentTime(audio.currentTime);
        }
    };

    return (
        <div className="musicApp">
            <div className="musicApp-info">
                베토벤 토마토 디럭스 플레이어
            </div>
            <div className="wave">
                {analyzerData && <WaveForm analyzerData={analyzerData} />}
            </div>
            <div className="audio-player">
                <audio ref={audioElmRef} id="audio" src={audioUrl}></audio>

                <div className="volumeControl">
                    {muted ? (
                        <FaVolumeMute
                            className="mute"
                            onClick={handleToggleMute}
                            style={{ cursor: 'pointer', fontSize: '30px', marginRight: "10px" }} // 음소거 상태일 때 색상을 변경할 수 있습니다.
                        />
                    ) : (
                        <FaVolumeUp
                            className="volumeUp"
                            onClick={handleToggleMute}
                            style={{ cursor: 'pointer', fontSize: '30px', marginRight: "10px" }}
                        />
                    )}
                    {
                        !muted &&
                        <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{cursor: 'pointer'}}
                        />
                    }
                </div>

                <div className="runTime">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="runTimeBar">
                    <input
                        className="Bar"
                        type="range"
                        value={currentTime}
                        max={duration}
                        onChange={handleSeek}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="audioBtn">
                    <button className="startAndPause" onClick={togglePlay}>
                        {isPlaying ? <FaPause style={{ cursor: 'pointer' }} /> :
                            <BsFillTriangleFill style={{ cursor: 'pointer', transform: 'rotate(90deg)' }} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
