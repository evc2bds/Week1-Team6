import React, { useEffect, useState } from 'react';
import MainHeader from "./MainHeader.js"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import db from "./firebase.js"

function ClassPage () {

    const[classInfo, setClassInfo] = useState(); 
    const[teacherInfo, setTeacherInfo] = useState(); 
    const[curStudent, setCurStudent] = useState(); 
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
    // const getStudentInfo = (studentID, x) => {
    //     console.log(curStudent); 
    //     if(classInfo && (curStudent.length<x+1) && studentID) {
    //         getDoc(doc(db, "students", studentID))
    //         .then((res) => {
    //             let curRoster = curStudent;
    //             curRoster.push(res.data());
    //             setCurStudent(curRoster);
    //         })
    //     }
    // }
    const buildRoster = () => {
        if(classInfo && !curStudent) {
            let roster = []; 
            for(let x = 0; x < classInfo.roster.length; x++) {
                let studentID = classInfo.roster[x]._key.path.segments[6]; 
                getDoc(doc(db, "students", studentID)).then((res) => roster.push(res.data()))
            }
            setCurStudent(roster); 
        }
    }
    useEffect(() => {
        getClassInfo(); 
        getTeacherInfo(); 
        buildRoster(); 
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
    if(classInfo && !curStudent) {
        buildRoster(); 
    }
    if(curStudent) {
        console.log(curStudent); 
    }
    if(curStudent) {
    return(
        <div>
            <MainHeader /> 
            <h2 style={{fontFamily: "arial", fontSize: 32}}>Class Page for {className}</h2>
            <h3 style={{fontFamily: "arial"}}>Teacher: {teacherName}</h3>
            {/* <RosterList /> */}
        </div>
    );
    }
    else {
        return(
            <div>
                <MainHeader /> 
                <h2 style={{fontFamily: "arial", fontSize: 32}}>Class Page for {className}</h2>
                <h3 style={{fontFamily: "arial"}}>Teacher: {teacherName}</h3>
                <h1>Currently Loading Roster...</h1>
            </div>
        ); 
    }
}

export default ClassPage