import React, { useEffect, useState } from 'react';
import MainHeader from "./MainHeader"
import ClassList from "./ClassList"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ClassPage from "./ClassPage"

function ClassDashboard(props) {
    
    if(props.updateTheDB) {
        return(
            <div style={{textAlign: "center"}}>
                <MainHeader curURL={"classes"}/>
                <h3 style={{fontFamily: "arial", fontSize: 24}}>Class Directory</h3>
                <p>Go to class pages to edit rosters. </p>
                <ClassList updateDB={props.updateTheDB}/>
            </div>
        );
    }
}

export default ClassDashboard