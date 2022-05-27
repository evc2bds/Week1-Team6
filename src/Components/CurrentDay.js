import React from 'react';
import db from "../firebase.js";
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";

class CurrentDay extends React.Component {
    render() {
        return (
            <div>
                <h2 style={{textAlign: "left", padding: 10, paddingLeft: 30, fontSize: 24}}>Today...</h2>
                <CurrentDayList />
            </div>
        );
    }
}

class CurrentDayList extends React.Component {
    render() {
        const today = new Date(); 
        // const todayString = String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0') + "-" + today.getFullYear();
        const todayString = String(today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0')) + "-" + String(today.getDate()).padStart(2, '0');
        let students = [];
        //fill array with students from database
        getDocs(collection(db, "students")) //grab collection
        .then((allStudents)=>{
            allStudents.forEach((student)=>students.push({ id: student.id, ...student.data()}))
            students.sort((a,b) => (a.lname > b.lname) ? 1:-1)
        })
        
        let studentsWithBirthdayToday = [];
        for(let x = 0; x < students.length; x++) {
            if(students[x].birthday === todayString) {
                studentsWithBirthdayToday.push(students[x]);
            }
        }
        let events = []; 
        //fill array with events from the database
        getDocs(collection(db, "Events")) //get collection
        .then((allEvents) => { //format each event into an array
            allEvents.forEach((event) => events.push({ id: event.id, ...event.data() }))
            events.sort((a,b) => (a.eventDate > b.eventDate) ? 1:-1)
        })

        if (events) {
            console.log(events)
        }

        let eventsToday = []; 
        for(let x = 0; x < events.length; x++) {
            if(events[x].eventDate === todayString) {
                eventsToday.push(events[x]);
            }
        }
        return (
            <div style={{borderThickness: 1, borderStyle: "solid", margin: 30,}}>
                {/* <StudentBirthdays birthdays={studentsWithBirthdayToday}/> */}
                <SchoolEvents events={eventsToday}/>
            </div>
        );
    }
}

// class StudentBirthdays extends React.Component{
//     render() {
//         const birthdayArray = this.props.birthdays;
//         if(!birthdayArray[0]) {
//             return(
//                 <div>
//                     <h3 style={{fontSize: 24}}>Student Birthdays</h3>
//                     <p style={{textAlign: "left", margin: 15, fontSize: 18}}>No student has a birthday today.</p>
//                 </div>
//             );
//         }
//         else {
//             return(
//                 <div>
//                     <h3>Student Birthdays</h3>
//                     <ul>
//                     {birthdayArray.map((student) => <li>{student.name} has a birthday today!</li>)}
//                     </ul>
//                 </div>
//             );
//         }
//     }
// }

class SchoolEvents extends React.Component {
    render() {
        const todaysEvents = this.props.events; 
        if(!todaysEvents[0]) {
            return(
                <div>
                    <h3 style={{fontSize: 24}}>School Events Today</h3>
                    <p style={{textAlign: "left", margin: 15, fontSize: 18}}>No school events today.</p>
                </div>
            );
        }
        else {
            return(
                <div>
                    <h3>School Events</h3>
                    <ul>
                    {todaysEvents.map((event) => <li>{event.title} is happening today!</li>)}
                    </ul>
                </div>
            );
        }
    }
}

export default CurrentDay