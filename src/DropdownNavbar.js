import React from 'react';
import {FormControl, Select, InputLabel, MenuItem} from "@mui/material"; 

class DropdownNavbar extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {
            nextPageValue: "homeDashboard"
        }
    }
    render() {
        const handleChange = (event) => {
            this.setState({
                nextPageValue: event.target.value
            });
            console.log("changed to " + event.target.value);
            console.log("Implement React Router"); 
            //TODO: USE REACT ROUTER TO MOVE BETWEEN WEB PAGES
        }
        return(
            <div style={{padding: 10}}>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="next-page-label">Navigate to Page</InputLabel>
                    <Select
                        labelId="next-page-label"
                        id="next-page"
                        value={this.state.nextPageValue}
                        label="Navigate to Page"
                        onChange={handleChange}>
                        <MenuItem value={"homeDashboard"}>Main Page</MenuItem>
                        <MenuItem value={"studentDirectory"}>Student Directory</MenuItem>
                        <MenuItem value={"teacherDashboard"}>Teacher Dashboard</MenuItem>
                        <MenuItem value={"classDashboard"}>Classes</MenuItem>
                        <MenuItem value={"teacherDirectory"}>Teacher Directory</MenuItem>
                        <MenuItem value={"eventCalendar"}>Event Calendar</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default DropdownNavbar