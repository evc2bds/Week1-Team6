import React from 'react';
import './App.css';
import MainHeader from "./MainHeader.js"
import CurrentDay from "./CurrentDay.js"
import ImportantLinks from "./ImportantLinks.js"

class MainDashboard extends React.Component {
    render() {
        return(
            <div>
                <MainHeader />
                <CurrentDay />
                <ImportantLinks />
            </div>
        );
    }
}

export default MainDashboard