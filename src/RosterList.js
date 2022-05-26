import React from 'react';
import {FormControl, Select, InputLabel, MenuItem, Button} from "@mui/material"; 
import db from "./firebase.js"
import {getDocs, doc, collection, updateDoc} from "firebase/firestore";

class RosterList extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {
            allStudents: [],
            studentsLoaded: false, 
            changedStudent: false
        }
    }
    componentDidMount() {
        const q = collection(db, "students");
        getDocs(q)
        .then((allDocs) => {
        let x = [];
        allDocs.forEach((doc) => {
            let newVar = doc.data(); 
            newVar.id = doc.id; 
            x.push(newVar)
        })
        this.setState({
            allStudents: x, 
            studentsLoaded: true
        }); 
        }); 
    }
    componentDidUpdate() {
        console.log("updating...")
        console.log(this.state.changedStudent)
        if(this.state.changedStudent) {
            const q = collection(db, "students");
            getDocs(q)
            .then((allDocs) => {
            let x = [];
            allDocs.forEach((doc) => {
                let newVar = doc.data(); 
                newVar.id = doc.id; 
                x.push(newVar)
            })
            .then(() => {this.setState({
                allStudents: x, 
                studentsLoaded: true,
                changedStudent: false
            })})
            }); 
            console.log("updated!");
            console.log(this.state.changedStudent)
        }
    }
    addStudent = (student, currentRoster, classID) => {
        if(student) {
            let curRoster = currentRoster; 
            const ID = classID;
            let studentPath = doc(db, 'students/'+student.id);
            curRoster.push(studentPath); 
            // console.log(curRoster); 
            updateDoc(doc(db, "classes", ID), {
                roster: curRoster
            }).then(this.setState({ changedStudent: true }));
        }
    }
    getStudentID = (student) => {
        let allStudentsInTheSchool = this.state.allStudents
        for(let x = 0; x < allStudentsInTheSchool.length; x++) {
            if(student.fname==allStudentsInTheSchool[x].fname && student.GPA==allStudentsInTheSchool[x].GPA && student.lname==allStudentsInTheSchool[x].lname) {
                return allStudentsInTheSchool[x].id; 
            }
        }
        return null; 
    }
    deleteStudent = (student, currentRoster, classID) => {
        if(student) { 
            const ID = classID;
            const studentID = this.getStudentID(student); 
            let newRoster = [];
            for(let x = 0; x < currentRoster.length; x++) {
                if(currentRoster[x].id!=studentID) {
                    newRoster.push(currentRoster[x]);
                }
            }
            updateDoc(doc(db, "classes", ID), {
                roster: newRoster
            }).then(this.setState({ changedStudent: true }));
        }
    }
    equals(student1, student2) {
        if(student1.GPA==student2.GPA && student1.fname==student2.fname && student1.lname==student2.lname) {
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
        const studentArray = this.props.studentRoster; 
        for(let x = 0; x < studentArray.length; x++) {
            if(!this.arrayIncludesValue(this.state.allStudents, studentArray[x])) {
                studentArray.splice(x, 1);
            }
        }
        if(this.state.studentsLoaded){
            return(
                <div style={{borderStyle: "dashed", borderWidth: 2, margin: 10}}>
                    <p>{this.state.changedStudent.toString()}</p>
                    {studentArray.map((student) => <StudentBox  classID={this.props.classID} rosterInfo={this.props.rosterInfo} deleteStudent={this.deleteStudent} key={student} student={student}/>)}
                    <h3 style={{textAlign: "left", marginLeft: 10}}>Add New Student: </h3>
                    <AddNewStudent classID={this.props.classID} rosterInfo={this.props.rosterInfo} addStudent={this.addStudent} allStudents={this.state.allStudents} currentStudents={studentArray}/>
                </div>
            );
        }
        else {
            return(
                <div style={{borderStyle: "dashed", borderWidth: 2, margin: 10}}>
                    {studentArray.map((student) => <StudentBox classID={this.props.classID} rosterInfo={this.props.rosterInfo} addStudent={this.deleteStudent} key={student} student={student}/>)}
                </div>
            );
        }
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
        if(student1.GPA==student2.GPA && student1.fname==student2.fname && student1.lname==student2.lname) {
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
                console.log(allStudentArray[x].fname + " is not in the current students");
                notInClass.push(allStudentArray[x]);
            }
        }
        console.log(notInClass); 
        if(notInClass[0]) {
            // this.setState({
            //     studentChosen: notInClass[0],
            // });
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