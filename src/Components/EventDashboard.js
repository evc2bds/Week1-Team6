import React, {useState, useEffect, useRef} from 'react'
import AllEvents from "./AllEvents.js"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import db from "../firebase.js";
import { FirebaseError } from 'firebase/app';

function EventDashboard() {
    const [events, setEvents] = useState([])
    const textFieldRefEvent = useRef(null);
    const textFieldRefDate = useRef(null);
    const textFieldRefLocation = useRef(null);

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
            eventName: textFieldRefEvent.current.value,
            eventDate: textFieldRefDate.current.value,
            eventLoc: textFieldRefLocation.current.value
        }
        addDoc(collection(db, "Events"), newEvent)
        .then((docRef) => {
            setEvents([...events, {id: docRef.id, ...newEvent}]) //update state variable
        })
        .catch((e) => console.error(e))
        textFieldRefEvent.current.value = ""
        textFieldRefDate.current.value = ""
        textFieldRefLocation.current.value = ""
    }

    return (
        <div>
            <br></br>
            <form onSubmit={addEvent}>
                <label for="eventName">Enter Event Name: </label>
                <input id="eventName" type="text" ref={textFieldRefEvent} />
                <p></p>

                <label for="eventDate">Enter Event Date: </label>
                <input id="eventDate" type="datetime-local" ref={textFieldRefDate} />
                <p></p>

                <label for="eventLoc">Enter Event Location: </label>
                <input id="eventLoc" type="text" ref={textFieldRefLocation} />
                <p></p>
                <input type="submit" value="Add Event"/>
            </form>

            {events.map((event) => <AllEvents key={event.id} id={event.id} eventName={event.eventName} eventDate={event.eventDate} eventLoc={event.eventLoc} deleteEvent={deleteEvent}/>)}
        </div>

    )


}
export default EventDashboard;