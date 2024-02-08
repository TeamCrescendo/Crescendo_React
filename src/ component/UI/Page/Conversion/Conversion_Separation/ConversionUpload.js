import React, { useRef, useState } from 'react';
import './ConversionUpload.scss';
const ConversionUpload = () => {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFileType = event.target.files[0].type;

            if (selectedFileType.startsWith('audio/')) {
                setSelectedFile(event.target.files[0]);
            } else {
                alert('Please choose an audio file.');
            }
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    return (
        <div>
            <h1 className="form-up">파일을 업로드 하세요 !</h1>
            <input
                type="file"
                ref={inputRef}
                onChange={handleOnChange}
                accept="audio/*"
                style={{ display: 'none' }}
            />
            <button className="file-btn" onClick={onChooseFile}>
                <span className="material-symbol-rounded">🎵</span> Upload Audio File
            </button>
            {selectedFile && (
                <div className="selected-file">
                    <p>{selectedFile.name}</p>
                    <button onClick={removeFile}>
                        <span className="material-symbols-rounded">❌</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConversionUpload;