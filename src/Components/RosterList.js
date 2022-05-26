import React, { useEffect, useState } from 'react';
import {FormControl, Select, InputLabel, MenuItem, Button} from "@mui/material"; 
import db from "../firebase.js"
import {getDocs, doc, collection, updateDoc} from "firebase/firestore";

function RosterList(props) {    
    const [allStudents, setStudents] = useState();
    const [studentsInClass, setCurStudents] = useState();
    const [rosterInfo, setRosterInfo] = useState();
    const getStudents = () => {
        const q = collection(db, "students");
        getDocs(q)
        .then((allDocs) => {
        let x = [];
        allDocs.forEach((doc) => {
            let newVar = doc.data(); 
            newVar.id = doc.id; 
            x.push(newVar)
        })
        setStudents(x);
        }); 
    }
    console.log(props.studentRoster[0]);
    if(!studentsInClass && !props.studentRoster[0]) {
        console.log("empty class")
        setCurStudents([])
        setRosterInfo(props.rosterInfo); 
    }
    if((!studentsInClass || studentsInClass.length==0) && props.studentRoster[0]) {
        console.log("not empty class")
        setCurStudents(props.studentRoster);
        setRosterInfo(props.rosterInfo); 
    }
    
    useEffect(() => {
        getStudents();
    }, [db, props]);
    const addStudent = (student, currentRoster, classID) => {
        if(student) {
            let curRoster = [];
            if(rosterInfo) {
                curRoster = rosterInfo; 
            }
            console.log(curRoster); 
            console.log(studentsInClass)
            const ID = classID;
            let studentPath = doc(db, 'students/'+student.id);
            curRoster.push(studentPath); 
            // console.log(curRoster); 
            updateDoc(doc(db, "classes", ID), {
                roster: curRoster
            }).then((q) => {getStudents()});
            let newStudents = studentsInClass;
            newStudents.push(student); 
            setCurStudents(newStudents)
        }
    }
    const getStudentID = (student) => {
        let allStudentsInTheSchool = allStudents
        for(let x = 0; x < allStudentsInTheSchool.length; x++) {
            if(student.fname===allStudentsInTheSchool[x].fname && student.GPA===allStudentsInTheSchool[x].GPA && student.lname===allStudentsInTheSchool[x].lname) {
                return allStudentsInTheSchool[x].id; 
            }
        }
        return null; 
    }
    const deleteStudent = (student, currentRoster, classID) => {
        if(student) { 
            const ID = classID;
            const studentID = getStudentID(student); 
            let newRoster = [];
            for(let x = 0; x < studentsInClass.length; x++) {
                if(studentsInClass[x].id!=studentID) {
                    newRoster.push(rosterInfo[x]);
                }
            }
            updateDoc(doc(db, "classes", ID), {
                roster: newRoster
            }).then((dcdd) => {getStudents()});
            let rosterWithDeletedStudent = []; 
            for(let x = 0; x < studentsInClass.length; x++) {
                if(studentsInClass[x] != student) {
                    rosterWithDeletedStudent.push(studentsInClass[x])
                }
            }
            setCurStudents(rosterWithDeletedStudent);
            setRosterInfo(newRoster); 
        }
    }
    const equals = (student1, student2) => {
        if(student1.GPA===student2.GPA && student1.fname===student2.fname && student1.lname===student2.lname) {
            return true; 
        }
        else {return false;}
    }
    const arrayIncludesValue = (array, value) => {
        let bool = false; 
        for(let x = 0; x < array.length; x++) {
            if(equals(array[x], value)) {
                return true; 
            }
        }
        return bool; 
    }
    console.log(studentsInClass); 
    console.log(allStudents);   
    let newClassRoster = [];
    if(allStudents) {
        for(let x = 0; x < studentsInClass.length; x++) {
            if(arrayIncludesValue(allStudents, studentsInClass[x])) {
                newClassRoster.push()
            }
        }
    }
    if(allStudents){
        return(
            <div style={{borderStyle: "dashed", borderWidth: 2, margin: 10}}>
                {studentsInClass.map((student) => <StudentBox  classID={props.classID} rosterInfo={rosterInfo} deleteStudent={deleteStudent} key={student} student={student}/>)}
                <h3 style={{textAlign: "left", marginLeft: 10}}>Add New Student: </h3>
                <AddNewStudent classID={props.classID} rosterInfo={rosterInfo} addStudent={addStudent} allStudents={allStudents} currentStudents={studentsInClass}/>
            </div>
        );
    }
    else {
        getStudents();
        return(
            <div style={{borderStyle: "dashed", borderWidth: 2, margin: 10}}>
                {props.studentRoster.map((student) => <StudentBox classID={props.classID} rosterInfo={rosterInfo} deleteStudent={deleteStudent} key={student.id} student={student}/>)}
            </div>
        );
    }
}

class StudentBox extends React.Component {

    render() {
        if(this.props.student) {
        return(
            <div style={{borderStyle: "solid", borderWidth: 1, margin: 4, marginRight: 8, marginLeft: 8}}>
                <h5 style={{textAlign: "left", fontSize: 20, margin: 10}}>{this.props.student.fname + " " + this.props.student.lname}</h5>
                <p style={{textAlign: "left", fontSize: 16, margin: 40}}>GPA: {this.props.student.GPA}</p>
                <Button variant="outlined" color="error" style={{alignContent: "right", marginBottom: 10}} onClick={() => this.props.deleteStudent(this.props.student, this.props.rosterInfo, this.props.classID)}>Remove from Class</Button>
            </div>
        );
        }   
    }
}

class AddNewStudent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            studentChosen: "",
        }
    }
    handleChange = (event) => {
        this.setState({
            studentChosen: event.target.value
        })
    }
    equals(student1, student2) {
        if(student1.GPA===student2.GPA && student1.fname===student2.fname && student1.lname===student2.lname) {
            return true; 
        }
        else {return false;}
    }
    arrayIncludesValue(array, value) {
        let bool = false; 
        for(let x = 0; x < array.length; x++) {
            if(this.equals(array[x], value)) {
                return true; 
            }
        }
        return bool; 
    }
    render() {
        const allStudentArray = this.props.allStudents; 
        const curStudentArray = this.props.currentStudents; 
        let notInClass = [];
        for(let x = 0; x < allStudentArray.length; x++) {
            if(!this.arrayIncludesValue(curStudentArray, allStudentArray[x])) {
                notInClass.push(allStudentArray[x]);
            }
        }
        console.log(notInClass); 
        if(notInClass[0]) {
            return(
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <FormControl sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel id="add-student-to-class-label">Choose Student to Add</InputLabel>
                        <Select
                            labelId="add-student-to-class-label"
                            id="add-student-to-class"
                            value={this.state.studentChosen}
                            label="Choose Student to Add"
                            onChange={this.handleChange}>
                            {notInClass.map((student) => <MenuItem value={student}>{student.fname + " " + student.lname}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={() => this.props.addStudent(this.state.studentChosen, this.props.rosterInfo, this.props.classID)}>Add</Button>
                </div>
            );
        }
    }
}

export default RosterList