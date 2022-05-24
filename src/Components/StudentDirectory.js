import Student from "./Student";
import Response from "./Response.js"
import {initializeApp} from "firebase/app"
import { getFirestore, collection, deleteDoc, addDoc, doc, getDocs, updateDoc, } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
function StudentDirectory() {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
        };
      const firebaseApp = initializeApp(firebaseConfig);
      const db = getFirestore(firebaseApp)
     
      //initialize students
      const [students, setStudents] = useState([])
      //get prev responses
      useEffect(() => {
            const students = []
            getDocs(collection(db, "students")) //probably need to swtich with real collection name
            .then((allStudents)=>{
                allStudents.forEach((student)=>student.push({ id: student.id, ...student.data()}))
                //sort by last name
                sort((a,b) => (a.lname < b.lname) ? 1:-1)
                setStudents(students)
            })
        }, [db])

        const addStudent = (s) => {
            s.preventDefault();
            //figure out how to enter multiple information for 1 student
            const newStudent = {
                fname : textFieldRef.current.value,
                lname : textFieldRef.current.value,
                gpa : textFieldRef.current.value
            }
            addDoc(collection(db, "students"), newResponse)//add the new student
            .then((docRef) => {
                setStudents([...responses, {id: docRef.id, ... newResponse}]) //update state
            })
            .cathc((s)=> console.eroor(s))

            textFieldRef.current.value=""
        }

        return(
            <div className="studentdirectory">
                <h1>Student Directory</h1>
                <div>
                <form onSubmit={addStudent} >
                    <input type="text" ref={textFieldRef} />
                    <input type="submit" />
                </form>
                <form onSubmit={removeStudent} >
                    <input type="text" ref={textFieldRef} />
                    <input type="submit" />
                </form>
                <form onSubmit={editStudent} >
                    <input type="text" ref={textFieldRef} />
                    <input type="submit" />
                </form>
                </div>
               
      
      {responses.map((response) => <Response key={response.id} id={response.id} responseText={response.responseText} upvotes={response.upvotes} upvote={upvote}/> )}
            </div>
        );
}

  
export default StudentDirectory;