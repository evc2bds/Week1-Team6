function AllEvents(props) {
    const date = props.eventDate;
    const year = date.substring(0,4);
    const monthDay = date.substring(5,10);
    const time = date.substring(11);
    return (
        <div className="event">
            <br></br>
            <p>{monthDay}-{year} at {time}: {props.eventName} at {props.eventLoc}</p>
            <input type="submit" onClick={() => props.deleteEvent(props.id)} value="Delete Event" />
            <br></br>

        </div>
    )
}
export default AllEvents;