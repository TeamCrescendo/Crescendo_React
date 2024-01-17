
import React, {useState} from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

import './Crescendo_main.scss';
import Conversion from "../UI/Page/Conversion/Conversion";
import MyPage from "../UI/Page/MyPage/MyPage";
import RecordBar from "../UI/RecordBar/RecordBar";
import TeamInfo from "../UI/Page/TeamInfo/TeamInfo";
import WebInfo from "../UI/Page/WebInfo/WebInfo";
import Board from "../UI/Page/Board/Board";

const Crescendo_main = () => {
    const [pageId, setPageId] = useState(1);
    const [isForward, setIsForward] = useState(true);
    const pageGetter = (id, getIsForward) => {
        console.log("이동한 페이지는: ", id);
        console.log("forward?: ", getIsForward);
        setPageId(id);
        setIsForward(getIsForward);
    }
    const renderPage = () => {
        switch (pageId) {
            case 1:
                return <Conversion isForward={isForward}/>;
            case 2:
                return <MyPage isForward={isForward}/>;
            case 3:
                return <Board isForward={isForward} />;
            case 4:
                return <WebInfo isForward={isForward} />;
            case 5:
                return <TeamInfo isForward={isForward} />;
            default:
        }
    };

    return (
        <>
            <RecordBar pageGetter={pageGetter}/>
            <div className='CrescendoMain'>
                {renderPage()}
            </div>
        </>
    );
};

export default Crescendo_main;