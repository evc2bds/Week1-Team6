import React, { useEffect, useState } from 'react';
import MainHeader from "./MainHeader.js"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import db from "./firebase.js"

function ClassPage () {

    const[classInfo, setClassInfo] = useState(); 
    const[teacherInfo, setTeacherInfo] = useState(); 
    const[curStudent, setCurStudent] = useState([]); 
    console.log(curStudent); 

    //this will later be passed as a prop down from the dashboard
    const classID = "xo1tdfJStoQnXwKOCHV4"; 
    const classRef = doc(db, "classes", classID); 
    const getClassInfo = () => {
        if(!classInfo) {
            getDoc(classRef)
            .then((res) => setClassInfo(res.data()))
        }
    }
    const getTeacherInfo = () => {
        if(classInfo && !teacherInfo) {
            const teacherID = classInfo.teacher._key.path.segments[6];
            getDoc(doc(db, "Teachers", teacherID))
            .then((res) => setTeacherInfo(res.data()))
        }
    }
    const getStudentInfo = (studentID, x) => {
        console.log(curStudent); 
        if(classInfo && (curStudent.length<x+1) && studentID) {
            getDoc(doc(db, "students", studentID))
            .then((res) => {
                let curRoster = curStudent;
                curRoster.push(res.data());
                setCurStudent(curRoster);
            })
        }
    }
    useEffect(() => {
        getClassInfo(); 
        getTeacherInfo(); 
        getStudentInfo(); 
    }, [db])
    // console.log(classInfo); 
    // console.log(teacherInfo);
    let className = "..."; 
    if(classInfo) {
        className = classInfo.name;
    }
    let teacherName = "Getting Info...";
    if(!teacherInfo) {
        getTeacherInfo(); 
    }
    else{
    teacherName = teacherInfo.firstName + " " + teacherInfo.lastName; 
    }
    console.log(curStudent); 
    console.log(curStudent.length); 
    if(classInfo && (curStudent.length != classInfo.roster.length)) {
        for(let x = 0; x < classInfo.roster.length; x++) {
            let studentID = classInfo.roster[x]._key.path.segments[6]; 
            if(curStudent.length < x+1) {
                console.log(curStudent.length); 
                console.log(x); 
                getStudentInfo(studentID, x);
            }
        }
        if(curStudent.includes(classInfo.roster[classInfo.roster.length])) {
            console.log("hi")
        }
    }
    return(
        <div>
            <MainHeader /> 
            <h2 style={{fontFamily: "arial", fontSize: 32}}>Class Page for {className}</h2>
            <h3 style={{fontFamily: "arial"}}>Teacher: {teacherName}</h3>
            {/* <RosterList /> */}
        </div>
    );
}

export default ClassPage