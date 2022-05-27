function AllEvents(props) {
    const dateString = props.eventDate;
    const year = dateString.substring(0,4);
    const monthDay = dateString.substring(5,10);
    const time = dateString.substring(11);
    const endDate = props.eventDateEnd;
    const endTime = endDate.substring(11);
    console.log(typeof endDate)
    return (
        <div className="event">
            <br></br>
            <p>{monthDay}-{year} from {time} to {endTime}: {props.title}</p>
            <input type="submit" onClick={() => props.deleteEvent(props.id)} value="Delete Event" />
            <br></br>
        </div>
    )
}
export default AllEvents;