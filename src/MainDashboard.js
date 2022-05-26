import React from 'react';
import './App.css';
import MainHeader from "./MainHeader.js"
import CurrentDay from "./CurrentDay.js"
import ImportantLinks from "./ImportantLinks.js"
import {Outlet} from "react-router-dom"

class MainDashboard extends React.Component {
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <MainHeader />
                <CurrentDay />
                <ImportantLinks />
            </div>
        );
    }
}

export default MainDashboard