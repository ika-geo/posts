import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./components/Header";

import './style/header.css'
import './style/footer.css'


const HeaderFooter = () => {


    return (
        <div className='container'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default HeaderFooter;