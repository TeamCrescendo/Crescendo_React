
import React, {useState} from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

import './Crescendo_main.scss';
import Conversion from "../UI/Page/Conversion/Conversion";

const Crescendo_main = () => {

    return (
        <div className='CrescendoMain'>
            <Conversion />
        </div>
    );
};

export default Crescendo_main;