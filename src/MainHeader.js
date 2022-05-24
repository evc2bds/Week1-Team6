import React from 'react';
import TitleHeader from "./TitleHeader.js"
import DropdownNavbar from "./DropdownNavbar.js"

class MainHeader extends React.Component {
    render() {
        return(
            <div style={{borderBottomStyle: "dotted", borderThickness: 2, padding: 5, paddingBottom: 20, backgroundColor: "white"}}>
                <TitleHeader />
                <DropdownNavbar />
            </div>
        );
    }
}

export default MainHeader