import React, {useState, useEffect, useRef} from 'react'
import AllTeachers from "./AllTeachers.js"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase.js";
import { Button } from '@mui/material';
import MainHeader from "./MainHeader.js"

function TeacherDashboard() {
    //Firebase config 
    const [teachers, setTeachers] = useState([])
    const textFieldRefFirst = useRef(null);
    const textFieldRefLast = useRef(null);
    const textFieldRefClass = useRef(null);

    useEffect(() => {
        const teachers = []
        getDocs(collection(db, "Teachers")) //get collection
        .then((allTeachers) => { //format each teacher into an array
            allTeachers.forEach((teacher) => teachers.push({ id: teacher.id, ...teacher.data() }))
            teachers.sort((a,b) => (a.lastName > b.lastName) ? 1:-1)
            setTeachers(teachers)
        })
    }, [db])

    const deleteTeacher = (teacherID) => {
        deleteDoc(doc(db, "Teachers", teacherID))
        .then((docRef) => {
            const updatedTeachers = [...teachers]
            updatedTeachers.forEach((teacher) => {
                console.log("teacherid: "+teacher.id)
            })
            setTeachers(updatedTeachers)
        })
        .catch((e) => console.error(e))
    }

    const editFirstName = (teacherID) => {
        updateDoc(doc(db, "Teachers", teacherID), {
            firstName: textFieldRefFirst.current.value
        })
        .then((docRef) => {
            const updatedTeachers = [...teachers]
            updatedTeachers.forEach((teacher) => {
                console.log(teacher.id)
            })
            setTeachers(updatedTeachers)
        })
        .catch((e) => console.error(e))
    }

    const editLastName = (teacherID) => {
        updateDoc(doc(db, "Teachers", teacherID), {
            lastName: textFieldRefLast.current.value
        })
        .then((docRef) => {
            const updatedTeachers = [...teachers]
            updatedTeachers.forEach((teacher) => {
                console.log(teacher.id)
            })
            setTeachers(updatedTeachers)
        })
        .catch((e) => console.error(e))
    }

    const editClassName = (teacherID) => {
        updateDoc(doc(db, "Teachers", teacherID), {
            className: textFieldRefLast.current.value
        })
        .then((docRef) => {
            const updatedTeachers = [...teachers]
            updatedTeachers.forEach((teacher) => {
                console.log(teacher.id)
            })
            setTeachers(updatedTeachers)
        })
        .catch((e) => console.error(e))
    }


    const addTeacher = (e) => {
        e.preventDefault(); //no reloading the page

        const newTeacher = {
            firstName: textFieldRefFirst.current.value,
            lastName: textFieldRefLast.current.value,
            className: textFieldRefClass.current.value
        }
        addDoc(collection(db, "Teachers"), newTeacher) //add new Teacher
        .then((docRef) => {
            setTeachers([...teachers, {id: docRef.id, ...newTeacher}]) //update state variable
        })
        .catch((e) => console.error(e))
        textFieldRefFirst.current.value = ""
        textFieldRefLast.current.value = ""
        textFieldRefClass.current.value = ""
    }

    return (
        <div className="App">
            <MainHeader />
            <br></br>
            <form onSubmit={addTeacher}>
                <label for="firstName">Enter Teacher's First Name: </label>
                <input id="firstName" type="text" ref={textFieldRefFirst} />
                <p></p>

                <label for="lastName">Enter Teacher's Last Name: </label>
                <input id="lastName" type="text" ref={textFieldRefLast} />
                <p></p>

                <label for="className">Enter Teacher's Class Name: </label>
                <input id="className" type="text" ref={textFieldRefClass} />
                <p></p>
                <Button type="submit" variant='contained'>Add Teacher</Button>
            </form>
            <p>
                To edit a teacher's first name, last name, or class, type your change into the 
                corresponding section of the Add Teacher form and click the corresponding button under 
                the teacher you want to apply the change to. Refresh the page to see the changes.
            </p>

            {teachers.map((teacher) => <AllTeachers key={teacher.id} id={teacher.id} firstName={teacher.firstName} lastName={teacher.lastName} className={teacher.className} deleteTeacher={deleteTeacher} teacher={teacher} editFirstName={editFirstName} editLastName={editLastName} editClassName={editClassName}/>)}

        </div>
    );
}
export default TeacherDashboard;