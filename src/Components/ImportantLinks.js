import React from 'react';
import { Link, Outlet } from 'react-router-dom';

class ImportantLinks extends React.Component {
    render() {
       return(
           <div>
               <h2 style={{textAlign: "left", padding: 10, paddingLeft: 30, fontSize: 24}}>Quick Links </h2>
                <QuickLinks />
               

           </div>
       ); 
    }
}

class QuickLinks extends React.Component {
    render() {
        return(
            <div style={{borderThickness: 1, borderStyle: "solid", margin: 30,}}>
                <p>
                    <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem"}}>
                        <Link to="/">Home</Link> | {" "}
                        <Link to="/teacherdashboard">Teacher Dashboard</Link> | {" "}
                        <Link to="/studentdashboard">Student Dashboard</Link> | {" "}
                        <Link to="/events">Event Calendar</Link> | {" "}
                        <Link to="/classes">Class List</Link>
                    </nav>
                </p>
            </div>
        );
    }
}

export default ImportantLinks