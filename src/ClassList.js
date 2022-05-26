import React, { useEffect, useState } from "react";
import db from "./firebase.js"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

function ClassList() {
    const array = [1, 2, 3]
    const[classesInfo, setClasses] = useState(); 
    const getClass = () => {
        const q = collection(db, "classes"); 
        let x = [];
        getDocs(q)
        .then((allDocs) => {
        allDocs.forEach((doc) => {
            let newVar = doc.data(); 
            newVar.id = doc.id; 
            x.push(newVar)
        })})
        setClasses(x);
    }
    useEffect(() => {
        getClass();     
    }, [db])
    if(classesInfo) { 
        console.log(classesInfo)
        return(
            <div>
                {classesInfo.map((c) => <ClassBox class={c.id }/>)}    
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

    // useEffect(() => {
    //     getTeacher(); 
    // }, [db])
    // let teacherName = "Loading..."; 
    // if(!teacher) {
    //     getTeacher(); 
    // }
    // else{
    //     teacherName = teacher.firstName; 
    // }
    render() {
    return(
        // <div style={{borderStyle: "solid", borderWidth: 1, margin: 4, marginRight: 8, marginLeft: 8}}> 
        //     <p>test</p>
        //     {/* <h5 style={{textAlign: "left", fontSize: 20, margin: 10}}>{propsClass.name}</h5> */}
        //     {/* <p style={{textAlign: "left", fontSize: 16, margin: 40}}>Teacher: {teacherName}</p> */}
        //     {/* <Button variant="outlined" color="error" style={{alignContent: "right", marginBottom: 10}} onClick={() => this.props.deleteStudent(this.props.student, this.props.rosterInfo, this.props.classID)}>Remove from Class</Button> */}
        // </div>
        <div>
            <p>hi2</p>
        </div>
    );
    }
}

export default ClassList;