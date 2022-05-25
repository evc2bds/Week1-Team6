import React, {useState, useEffect, useRef} from 'react'
import AllTeachers from "./AllTeachers.js"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase.js";

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
            teachers.sort((a,b) => (a.lastName < b.lastName) ? 1:-1)
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
                <input type="submit" value="Add Teacher"/>
            </form>

            {teachers.map((teacher) => <AllTeachers key={teacher.id} id={teacher.id} firstName={teacher.firstName} lastName={teacher.lastName} className={teacher.className} deleteTeacher={deleteTeacher} teacher={teacher}/>)}

        </div>
    );
}
export default TeacherDashboard;