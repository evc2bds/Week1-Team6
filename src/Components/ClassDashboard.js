import React, { useEffect, useState } from 'react';
import MainHeader from "./MainHeader"
import ClassList from "./ClassList"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ClassPage from "./ClassPage"

function ClassDashboard() {
    return(
        <div style={{textAlign: "center"}}>
            <MainHeader />
            <h3 style={{fontFamily: "arial", fontSize: 24}}>Class Directory</h3>
            <p>Go to class pages to edit rosters. </p>
            <ClassList />
        </div>
    );
}

export default ClassDashboard