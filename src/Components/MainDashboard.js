import React from 'react';
import MainHeader from "./MainHeader.js"
import CurrentDay from "./CurrentDay.js"
import ImportantLinks from "./ImportantLinks.js"
import { Outlet, useLocation } from 'react-router-dom';

class MainDashboard extends React.Component {
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <MainHeader curURL={"/"} />
                <ImportantLinks />
                <CurrentDay />
                
            </div>
        );
    }
}

export default MainDashboard