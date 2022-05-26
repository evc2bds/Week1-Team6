import React, { useEffect, useState } from "react";
import db from "./firebase.js"
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import {FormControl, Select, InputLabel, MenuItem, Button} from "@mui/material"; 

function ClassList() {
    const[classesInfo, setClasses] = useState(); 
    const getClass = () => {
        const q = collection(db, "classes"); 
        let x = [];
        getDocs(q)
        .then((allDocs) => {
        allDocs.forEach((doc) => {
            let newClass = doc.data(); 
            newClass.id = doc.id; 
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
    }, [db])
    if(classesInfo) { 
        return(
            <div>
                {/* <ClassBox class={classesInfo[0].id}/> */}
                {classesInfo.map((c) => <ClassBox key={c.id} class={c} deleteClass={deleteClass}/>)} 
                <AddNewClass />   
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
    // const[teacher, setTeacher] = useState(); 
    // console.log(propsClass);
    // const getTeacher = () => {
    //     console.log("running getTeacher")
    //     console.log(teacher)
    //     if(propsClass && !teacher) { 
    //         console.log("still running")  
    //         const teacherID = propsClass.propsClass.teacher._key.path.segments[6];
    //         console.log(teacherID);
    //         console.log(teacher);
    //         getDoc(doc(db, "Teachers", teacherID))
    //         .then((res) => setTeacher(res.data()))
    //     }
    // }

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
            teacherName = this.state.teacherData.firstName
        }
    return(
        <div style={{borderStyle: "solid", borderWidth: 1, margin: 4, marginRight: 8, marginLeft: 8}}> 
            <h5 style={{textAlign: "left", fontSize: 20, margin: 10}}>{this.props.class.name}</h5>
            <p style={{textAlign: "left", fontSize: 16, margin: 40}}>Teacher: {teacherName}</p>
            <Button variant="outlined" color="error" style={{alignContent: "right", marginBottom: 10}} onClick={() => this.props.deleteClass(this.props.class.id)}>Delete Class</Button>
        </div>
    );
    }
}

class AddNewClass extends React.Component{
    constructor(props) {
        
    }
}

export default ClassList;