import React, { useState } from 'react';
import './Prompt_Info.scss';
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import Textarea from "@mui/joy/Textarea";
import {Typography} from "@mui/joy";

const PromptInfo = ({ text }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [zIndex, setZIndex] = useState(0);

    const runAnimation = () => {
        setIsAnimated(!isAnimated);
        setZIndex(isAnimated ? 0 : 20);
    };

    return (
        <div className={`prompt-info ${isAnimated ? 'animate' : 'animate-back'}`} style={{ zIndex: zIndex }}>
            <div className="info-container">
                <div className="textdiv">
                    <div className="info-header">
                        입력한 정보
                    </div>
                    <Textarea
                        className="music_prompt"
                        value={text}
                        minRows={9}
                        maxRows={9}
                        endDecorator={
                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                {text.length} character(s)
                            </Typography>
                        }
                        sx={{ minWidth: 350 }}
                        readOnly={true}
                    />
                </div>
            </div>
            <span className="sub-title" onClick={runAnimation}>
                {
                    isAnimated
                    ? <FaChevronLeft style={{fontSize:"30px", cursor:"pointer"}}/>
                    : <FaChevronRight style={{fontSize:"30px", cursor:"pointer"}}/>
                }
            </span>
        </div>
    );
};

export default PromptInfo;

