import React, { useEffect, useState } from "react";
import db from "../firebase.js"
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import {FormControl, Select, InputLabel, MenuItem, Button, TextField} from "@mui/material"; 
import {useNavigate} from "react-router-dom";

function ClassList(props) {
    const[classesInfo, setClasses] = useState(); 
    const[teachersInfo, setTeachers] = useState(); 
    const getTeachers = () => {
        const q = collection(db, "Teachers"); 
        let x = [];
        getDocs(q)
        .then((allDocs) => {
        allDocs.forEach((doc) => {
            let newTeacher = doc.data(); 
            newTeacher.id = doc.id; 
            x.push(newTeacher); 
        })
        setTeachers(x); 
        }
        )
    }
    const getClass = () => {
        const q = collection(db, "classes"); 
        let x = [];
        let x2 = [];
        getDocs(q)
        .then((allDocs) => {
        allDocs.forEach((doc) => {
            let newClass = doc.data(); 
            newClass.id = doc.id; 
            x2.push(doc.id); 
            x.push(newClass); 
        })
        setClasses(x); 
        }
        )
    }
    const addClass = (newClassName, newClassTeacherID) => {
        const teacherPath = doc(db, 'Teachers/'+newClassTeacherID);
        const newClassRef = doc(collection(db, "classes"));
        setDoc(newClassRef, {
            name: newClassName,
            teacher: teacherPath,
            roster: []
        }).then((res) => {getClass()})
    }
    const deleteClass = (deletedClassID) => {
        deleteDoc(doc(db, "classes", deletedClassID)).then((res) => {getClass()})
    }
    useEffect(() => {
        getClass();    
        getTeachers();  
    }, [db])
    let navigate = useNavigate(); 
    const goToPage = (IDPassed) => {
        let path = IDPassed; 
        navigate(path); 
    }
    if(classesInfo && teachersInfo) { 
        return(
            <div style={{borderStyle: "dashed", borderWidth: 2, margin: 10, textAlign: "center"}}>
                {classesInfo.map((c) => <ClassBox key={c.id} class={c} deleteClass={deleteClass} goToPage={goToPage}/>)} 
                <h3 style={{textAlign: "left", marginLeft: 10}}>Add New Class: </h3>
                <AddNewClass teachers={teachersInfo} addClass={addClass}/>   
            </div>
        );
    }
    return(
        <div>
            <p>class page</p>
        </div>
    );
}

class ClassBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teacherData: null,
            teacherDataLoaded: false
        }
    }
    componentDidMount() {
        const teacherID = this.props.class.teacher._key.path.segments[6];
        getDoc(doc(db, "Teachers", teacherID))
        .then((res) => {
            this.setState({
                teacherData: res.data(),
                teacherDataLoaded: true
            })
        })
    }
    render() {
        let teacherName = "Loading..."; 
        if(this.state.teacherDataLoaded) {
            teacherName = this.state.teacherData.firstName + " " + this.state.teacherData.lastName;
        }
    return(
        <div style={{borderStyle: "solid", borderWidth: 1, margin: 4, marginRight: 8, marginLeft: 8}}> 
            <h5 style={{textAlign: "left", fontSize: 20, margin: 10}}>{this.props.class.name}</h5>
            <p style={{textAlign: "left", fontSize: 16, margin: 40}}>Teacher: {teacherName}</p>
            <Button variant="outlined" style={{alignContent: "right", marginBottom: 10, margin: 5}} onClick={() => {this.props.goToPage(this.props.class.id)}}>Go to Page</Button>
            <Button variant="outlined" color="error" style={{alignContent: "right", marginBottom: 10, margin: 5}} onClick={() => this.props.deleteClass(this.props.class.id)}>Delete Class</Button>
        </div>
    );
    }
}

class AddNewClass extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            newName: "",
            newTeacherID: "",
            errorState: false,
            dropdownError: false,
        }
    }
    handleChange = (event) => {
        this.setState({
            newTeacherID: event.target.value,
        })
    }
    handleTextChange = (event) => {
        this.setState({
            newName: event.target.value,
        })
    }
    render() {
        const teacherArray = this.props.teachers;
        return(
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <TextField style={{margin: 5}} id="class-name" label="Class Name" variant="standard" error={this.state.errorState} onChange={this.handleTextChange}/>
                <FormControl sx={{ m: 1, minWidth: 220 }} error={this.state.dropdownError}>
                    <InputLabel id="choose-teacher-label">Select Teacher</InputLabel>
                    <Select
                        labelId="choose-teacher-label"
                        id="choose-teacher"
                        value={this.state.newTeacherID}
                        label="Select Class's Teacher"
                        onChange={this.handleChange}>
                        {teacherArray.map((teacher) => <MenuItem key={teacher.id} value={teacher.id}>{teacher.firstName + " " + teacher.lastName}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => {
                    if(this.state.newName=="") {
                        this.setState({
                            errorState: true
                        })
                    }
                    else {
                        this.setState({
                            errorState: false
                        })
                    }
                    if (this.state.newTeacherID=="") {
                        this.setState({
                            dropdownError: true
                        })
                    }
                    else {
                        this.setState({
                            dropdownError: false
                        })
                    }
                    if((this.state.newTeacherID!="") && (this.state.newName!="")) {
                        this.props.addClass(this.state.newName, this.state.newTeacherID)
                        this.setState({
                            newTeacherID: "",
                            errorState: false,
                            dropdownError: false,
                        })
                    }
                }}>Create</Button>
            </div>
        );
    }
}

export default ClassList;