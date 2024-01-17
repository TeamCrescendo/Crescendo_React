import {React, useRef, useState} from 'react';
import { MdCloudUpload, MdDelete} from "react-icons/md";
import { AiFillFileImage } from 'react-icons/ai'
import './Conversion.scss';
const Conversion = () => {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    //업로드 동작 함수
    const  handleOnChange = (event) =>{
        if (event.target.files && event.target.files.length >0){
            setSelectedFile(event.target.files[0]);
        }
    };
    //파일 업로드 함수
    const onChooseFile = () =>{
        inputRef.current.click();
    };
    //파일 취소 함수
    const removeFile = () =>{
        setSelectedFile(null);
    };

    return (
        <>
            <div className="conversionContainer">
                {/*악보 변환 페이지 입니다.*/}
                {/*업로드 파일 코드*/}
                <input type="file" ref={inputRef} onChange={handleOnChange} style={{display:"none"}}/>
                <button className="file-btn" onClick={onChooseFile}>
                    <span class = "material-symbol-rounded">🎵</span> Upload File
                </button>
                {selectedFile && <div className="selected-file">
                    <p>{selectedFile.name}</p>
                    <button onClick={removeFile}>
                        <span class="material-symbols-rounded">❌</span>
                    </button>
                </div>}
            </div>
        </>
    );
};

export default Conversion;