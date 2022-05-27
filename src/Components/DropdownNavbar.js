import React, {useState} from 'react';
import {FormControl, Select, InputLabel, MenuItem} from "@mui/material"; 
import {useNavigate} from "react-router-dom";

function DropdownNavbar(props) {
    const[nextPageValue, setNextPageValue] = useState(props.curURL);
    const[loaded, setLoaded] = useState(false); 
    let navigate = useNavigate(); 
    const handleChange = (event) => {
        setNextPageValue(event.target.value);
        setLoaded(true); 
    }
    const goToPage = (pageURL) => {
        setLoaded(false); 
        console.log(pageURL); 
        navigate("../" + pageURL);
    }
    if(loaded) {
        console.log("loaded"); 
        goToPage(nextPageValue); 
    }
    return(
            <div style={{padding: 10}}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="next-page-label">Navigate to Page</InputLabel>
                    <Select
                        labelId="next-page-label"
                        id="next-page"
                        value={nextPageValue}
                        label="Navigate to Page"
                        onChange={handleChange}>
                        <MenuItem value={"/"}>Main Page</MenuItem>
                        <MenuItem value={"studentdashboard"}>Student Directory</MenuItem>
                        <MenuItem value={"teacherdashboard"}>Teacher Directory</MenuItem>
                        <MenuItem value={"classes"}>Classes</MenuItem>
                        <MenuItem value={"events"}>Event Calendar</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
}

export default DropdownNavbar