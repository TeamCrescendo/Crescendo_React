import React, { useRef, useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import './Conversion.scss';
import {FaSearch} from "react-icons/fa";

const Conversion = () => {
    const inputRef = useRef();
    const ulRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    // 랭킹
    const newsTicker = (timer) => {
        if (ulRef.current) {
            const ul = ulRef.current;

            window.setInterval(() => {
                ul.style.transitionDuration = '400ms';
                ul.style.marginTop = '-34px';

                window.setTimeout(() => {
                    ul.style.transitionDuration = '';
                    ul.style.marginTop = '';
                    ul.appendChild(ul.querySelector('li:first-child'));
                }, 400);
            }, timer);
        }
    };

    useEffect(() => {
        newsTicker(1500);
    }, []);

    return (
        <>
            <div className="conversionContainer">
                <div className="w">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                        <button type="submit" className="searchButton">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                {/*--------------------업로드-------------------------*/}
                <input type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
                <button className="file-btn" onClick={onChooseFile}>
                    <span className="material-symbol-rounded">🎵</span> Upload File
                </button>
                {selectedFile && (
                    <div className="selected-file">
                        <p>{selectedFile.name}</p>
                        <button onClick={removeFile}>
                            <span className="material-symbols-rounded">❌</span>
                        </button>
                    </div>
                )}
                <h1>Ranking</h1>
                <div className="rolling">
                    <ul className="rolling__list" ref={ulRef}>
                        <li>1. River Flows In You</li>
                        <li>2. Love Me</li>
                        <li>3. May be</li>
                        <li>4. When the love falls</li>
                        <li>5. Yellow Room</li>
                        <li>6. Love</li>
                        <li>7. Kiss the rain</li>
                        <li>8. The Moment</li>
                        <li>9. Memories In My Eyes</li>
                        <li>10. Hope</li>
                    </ul>
                </div>

            </div>
        </>
    );
};
export default Conversion;