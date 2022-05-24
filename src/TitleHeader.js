import React from 'react';
import logo from "./TJLogo.jpg"
import DropdownNavbar from "./DropdownNavbar.js"

class TitleHeader extends React.Component {
    render() {
        return(
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img src={logo} alt={"Thomas Jefferson Elementary School"} style={{width: 180, height: "auto"}}/>
                <h2 style={{fontFamily: "arial", fontSize: 64, textAlign: "center", fontStyle: "italic", color: "#080740", marginLeft: 20}}>TJ Elementary School Dashboard</h2>
                <DropdownNavbar/>
            </div>
        );
    }
}

export default TitleHeader