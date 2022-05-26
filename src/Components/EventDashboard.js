import React, {useState, useEffect, useRef} from 'react'
import AllEvents from "./AllEvents.js"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import db from "../firebase.js";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";

//declare localizer for format of date
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function EventDashboard() {
    const [events, setEvents] = useState([])
    const textFieldRefEvent = useRef(null);
    const textFieldRefDate = useRef(null);
    const textFieldRefDateEnd = useRef(null);

    // Get previous responses on page load
    useEffect(() => {
        const events = []
        getDocs(collection(db, "Events")) //get collection
        .then((allEvents) => { //format each event into an array
            allEvents.forEach((event) => events.push({ id: event.id, ...event.data() }))
            events.sort((a,b) => (a.eventDate > b.eventDate) ? 1:-1)
            setEvents(events)
        })
    }, [db])

    const deleteEvent = (eventID) => {
        deleteDoc(doc(db, "Events", eventID))
        .then((docRef) => {
            const updatedEvents = [...events]
            updatedEvents.forEach((event) => {
                console.log(event.id)
            })
            setEvents(updatedEvents)
        })
        .catch((e) => console.error(e))
    }

    const addEvent = (e) => {
        e.preventDefault(); //no reloading the page
        const newEvent = {
            title: textFieldRefEvent.current.value,
            eventDate: textFieldRefDate.current.value,
            eventDateEnd: textFieldRefDateEnd.current.value
        }
        addDoc(collection(db, "Events"), newEvent)
        .then((docRef) => {
            setEvents([...events, {id: docRef.id, ...newEvent}]) //update state variable
        })
        .catch((e) => console.error(e))
        textFieldRefEvent.current.value = ""
    }

    console.log(events)
    return (
        <div className="App">
        <h1>Event Calendar</h1>
        <h4>Add New Event:</h4>
            <div>
                <form onSubmit={addEvent}>
                    <label for="eventName">Name: </label>
                    <input id="eventName" type="text" style={{ width: "20%", marginRight: "10px" }} ref={textFieldRefEvent} />
                    <label for="eventStart">Start: </label>
                    <input id="eventStart" type="datetime-local" style={{ width: "20%", marginRight: "10px" }} ref={textFieldRefDate} />
                    <label for="eventEnd">End: </label>
                    <input id="eventEnd" type="datetime-local" style={{ width: "20%", marginRight: "10px" }} ref={textFieldRefDateEnd} />
                    <input type="submit" value="Add Event"/>
                </form>
            </div>
            <Calendar 
                localizer={localizer} 
                events={events} 
                startAccessor="eventDate" 
                endAccessor="eventDateEnd" 
                style={{ height: 500, margin: "50px" }}
            />
            <h2>All Events:</h2>
            {events.map((event) => <AllEvents key={event.id} id={event.id} title={event.title} eventDate={event.eventDate} eventDateEnd={event.eventDateEnd} deleteEvent={deleteEvent}/>)}
        </div>

    )


}
export default EventDashboard;