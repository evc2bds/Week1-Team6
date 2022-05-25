import React from 'react';
import MainHeader from "./MainHeader.js"

class ClassPage extends React.Component {
    render() {
        //update this with firebase stuff
        const className = "Math"; 
        const teacherName = "Suzanne Einrich";
        const roster = [];
        return(
            <div>
                <MainHeader /> 
                <h3>Class Page for {className}</h3>
                <h4>Teacher: {teacherName}</h4>
                {/* <RosterList /> */}
            </div>
        );
    }
}

export default ClassPage