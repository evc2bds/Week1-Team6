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
    constructor(props) {
        super(props); 
        this.state = {
            events: null,
            birthdays: null
        }
    }
    componentDidMount() {
        getDocs(collection(db, "Events")) //get collection
        .then((allEvents) => { //format each event into an array
            let x = [];
            allEvents.forEach((event) => x.push({ id: event.id, ...event.data() }))
            x.sort((a,b) => (a.eventDate > b.eventDate) ? 1:-1)
            this.setState({
                events: x
            }); 
        })

        getDocs(collection(db, "students")) //grab collection
        .then((allStudents)=>{
            let i = [];
            allStudents.forEach((student)=>i.push({ id: student.id, ...student.data()}))
            i.sort((a,b) => (a.lname > b.lname) ? 1:-1)
            this.setState({
                birthdays: i
            });
        })
    }
    render() {
        const today = new Date(); 
        // const todayString = String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0') + "-" + today.getFullYear();
        const todayString = String(today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0')) + "-" + String(today.getDate()).padStart(2, '0');
        // let students = [];
        // //fill array with students from database
        // getDocs(collection(db, "students")) //grab collection
        // .then((allStudents)=>{
        //     allStudents.forEach((student)=>students.push({ id: student.id, ...student.data()}))
        //     students.sort((a,b) => (a.lname > b.lname) ? 1:-1)
        // })
        
        let studentsWithBirthdayToday = [];
        if(this.state.birthdays) {
            for(let x = 0; x < this.state.birthdays.length; x++) {
                if(this.state.birthdays[x].bday.substring(5, 10) == todayString.substring(5, 10)) {
                    studentsWithBirthdayToday.push(this.state.birthdays[x]);
                }
            }
        }
        
        //fill array with events from the database

        let eventsToday = []; 
        if(this.state.events) {
            for(let x = 0; x < this.state.events.length; x++) {
                if(this.state.events[x].eventDate.substring(0,10) == todayString) { 
                    eventsToday.push(this.state.events[x]);
                }
            }
        }
        if(this.state.events) {
        return (
            <div style={{borderThickness: 1, borderStyle: "solid", margin: 30,}}>
                <StudentBirthdays birthdays={studentsWithBirthdayToday}/>
                <SchoolEvents events={eventsToday}/>
            </div>
        );
        }
    }
}

class StudentBirthdays extends React.Component{
    render() {
        const birthdayArray = this.props.birthdays;
        console.log(birthdayArray);
        if(!birthdayArray[0]) {
            return(
                <div>
                    <h3 style={{fontSize: 24}}>Student Birthdays</h3>
                    <p style={{textAlign: "left", margin: 15, fontSize: 18}}>No student has a birthday today.</p>
                </div>
            );
        }
        else {
            return(
                <div>
                    <h3>Student Birthdays</h3>
                    <ul>
                    {birthdayArray.map((student) => <li style={{textAlign: "left", margin: 15, fontSize: 18}}>{student.fname} has a birthday today!</li>)}
                    </ul>
                </div>
            );
        }
    }
}

class SchoolEvents extends React.Component {
    render() {
        const todaysEvents = this.props.events; 
        console.log(todaysEvents); 
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
                    {todaysEvents.map((event) => <li style={{textAlign: "left", margin: 15, fontSize: 18}}>{event.title} is happening today!</li>)}
                    </ul>
                </div>
            );
        }
    }
}

export default CurrentDay