
import React, {useState} from "react";
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

import '../../Scss/Crescendo_main.scss';
import Conversion from "./Conversion";

const Crescendo_main = () => {

    return (
        <div className='CrescendoMain'>
            <Conversion />
        </div>
    );
};

export default Crescendo_main;