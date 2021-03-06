import React from 'react';
import logo from "./TJLogo.jpg"
import { Link } from 'react-router-dom';

class TitleHeader extends React.Component {
    render() {
        return(
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Link to="/"><img src={logo} alt={"Thomas Jefferson Elementary School"} style={{width: 180, height: "auto"}}/></Link>
                <h2 style={{fontFamily: "arial", fontSize: 64, textAlign: "center", fontStyle: "italic", color: "#080740", marginLeft: 20}}>TJ Elementary School Dashboard</h2>
            </div>
        );
    }
}

export default TitleHeader