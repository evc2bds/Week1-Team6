import Student from "./Student.js";
import Button from '@mui/material/Button';
import { getFirestore, collection, deleteDoc, addDoc, doc, getDocs, updateDoc, } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
import db from "../firebase.js";
import MainHeader from "./MainHeader.js"
import { startOfWeek, getDate, parse, format, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    getDate,
    locales,
});

function StudentDirectory() {     
      //initialize students
      const textFieldRefFirst = useRef(null);
      const textFieldRefLast = useRef(null);
      const textFieldRefGPA = useRef(null);
      const textFieldRefBday = useRef(null);
     // const textFieldRefBday = useRef(null);
      const [students, setStudents] = useState([])
      //get prev responses
      useEffect(() => {
            const students = []
            getDocs(collection(db, "students")) //grab collection
            .then((allStudents)=>{
                allStudents.forEach((student)=>students.push({ id: student.id, ...student.data()}))
                //sort by last name
                students.sort((a,b) => (a.lname > b.lname) ? 1:-1)
                setStudents(students)
            })
        }, [db])

        const addStudent = (s) => {
           s.preventDefault();
            //figure out how to enter multiple information for 1 student
            const newStudent = {
                fname : textFieldRefFirst.current.value,
                lname : textFieldRefLast.current.value,
                GPA : textFieldRefGPA.current.value,
                bday: textFieldRefBday.current.value,
            }
            addDoc(collection(db, "students"), newStudent)//add the new student
            .then((docRef) => {
                setStudents([...students, {id: docRef.id, ...newStudent}]) //update state
            })
            .catch((e)=> console.error(e))

            textFieldRefFirst.current.value = ""
            textFieldRefLast.current.value = ""
            textFieldRefGPA.current.value = ""
            textFieldRefBday.current.value = ""

        }

        const deleteStudent = (sID) => {
            //s.preventDefault();
            //figured out how to remove student
            deleteDoc(doc(db, "students", sID))
            .then((docRef) => {
                const tempStudents = [...students]
                tempStudents.forEach((student) => {
                    console.log("stuID: "+ student.id)
                })
                setStudents(tempStudents) //update state
            })
            .catch((e)=> console.error(e))

            
        }

        const editFirstName = (stuID) => {
            updateDoc(doc(db, "students", stuID), {
                fname: textFieldRefFirst.current.value
            })
            .then((docRef) => {
                const tempStudents = [...students]
                tempStudents.forEach((student) => {
                    console.log("stuID: "+ student.id)
                })
                setStudents(tempStudents) //update state
            })
            .catch((e) => console.error(e))
            textFieldRefFirst.current.value=""
        }
    
        const editLastName = (stuID) => {
            updateDoc(doc(db, "students", stuID), {
                lname: textFieldRefLast.current.value
            })
            .then((docRef) => {
                const tempStudents = [...students]
                tempStudents.forEach((student) => {
                    console.log("stuID: "+ student.id)
                })
                setStudents(tempStudents) //update state
            })
            .catch((e) => console.error(e))
            textFieldRefLast.current.value=""
        }
    
        const editGPA = (stuID) => {
            updateDoc(doc(db, "students", stuID), {
                GPA: textFieldRefGPA.current.value
            })
            .then((docRef) => {
                const tempStudents = [...students]
                tempStudents.forEach((student) => {
                    console.log("stuID: "+ student.id)
                })
                setStudents(tempStudents) //update state
            })
            .catch((e) => console.error(e))
            textFieldRefGPA.current.value=""
        }
        const editBirthday = (stuID) => {
            updateDoc(doc(db, "students", stuID), {
                bday: textFieldRefBday.current.value
            })
            .then((docRef) => {
                const tempStudents = [...students]
                tempStudents.forEach((student) => {
                    console.log("stuID: "+ student.id)
                })
                setStudents(tempStudents) //update state
            })
            .catch((e) => console.error(e))
            textFieldRefBday.current.value=""
        }

        return(
            <div className="studentdirectory">
            <MainHeader curURL="studentdashboard"/>
            <br></br>
            <form onSubmit={addStudent}>
                <label for="firstName">Enter Student's First Name: </label>
                <input id="firstName" type="text" ref={textFieldRefFirst} />
                <p></p>

                <label for="lastName">Enter Student's Last Name: </label>
                <input id="lastName" type="text" ref={textFieldRefLast} />
                <p></p>

                <label for="stuGPA">Enter Student's GPA: </label>
                <input id="stuGPA" type="text" ref={textFieldRefGPA} />
                <p></p>
                <Button type="submit" variant='contained'>Add Student</Button>         
            </form>
            <p>
                To edit a student's first name, last name, or GPA, type your change into the 
                corresponding section of the Add Student form and click the corresponding button under 
                the student you want to apply the change to. Refresh the page to see the changes.
            </p>

            {students.map((student) => <Student key={student.id} id={student.id} firstName={student.fname} lastName={student.lname} stuGPA={student.GPA} deleteStudent={deleteStudent} student={student} editFirstName={editFirstName} editLastName={editLastName} editGPA={editGPA}/>)}

        </div>
        );
}

  
export default StudentDirectory;