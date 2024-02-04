import WaveForm from "./WaveForm";
import { useEffect, useRef, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaPause } from "react-icons/fa6";
import './MusicApp.scss';

export default function MusicApp({ url }) {
    const [audioUrl, setAudioUrl] = useState();
    const [analyzerData, setAnalyzerData] = useState(null);
    const [audio, setAudio] = useState(null);
    const audioElmRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
            <div className="wave">
                {analyzerData && <WaveForm analyzerData={analyzerData} />}
            </div>
            <div
                style={{
                    height: 40,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <div className="audio-player">
                    <audio ref={audioElmRef} id="audio" src={audioUrl}></audio>

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
                        />
                    </div>
                    <div className="audioBtn">
                        <button className="startAndPause" onClick={togglePlay}>
                            {isPlaying ? <FaPause /> : <BsFillTriangleFill style={{transform: "rotate(90deg)"}}/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
