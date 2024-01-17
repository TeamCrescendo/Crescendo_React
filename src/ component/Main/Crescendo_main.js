
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

    const pageGetter = id => {
        console.log("이동한 페이지는: ", id);
        setPageId(id);
    }

    const renderPage = () => {
        switch (pageId) {
            case 1:
                return <Conversion />;
            case 2:
                return <MyPage />;
            case 3:
                return <Board />;
            case 4:
                return <WebInfo />;
            case 5:
                return <TeamInfo />;
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