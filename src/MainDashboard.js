import React from 'react';
import './App.css';
import MainHeader from "./MainHeader.js"

class MainDashboard extends React.Component {
    render() {
        return(
            <div>
                <MainHeader />
                {/* <CurrentDay /> */}
                {/* <ImportantLinks /> */}
            </div>
        );
    }
}

export default MainDashboard