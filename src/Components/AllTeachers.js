import React, {useState, useEffect, useRef} from 'react'

function AllTeachers(props) {
    const textFieldRefEditFirst = useRef(null);
    const textFieldRefEditLast = useRef(null);
    const textFieldRefEditClass = useRef(null);

    return (
        <div className="teacher">
            <br></br>
            <p>Name: {props.lastName}, {props.firstName} | Class: {props.className}</p>
            <input type="submit" onClick={() => props.editFirstName(props.id)} value="Edit First Name" />
            <input type="submit" onClick={() => props.editLastName(props.id)} value="Edit Last Name" />
            <input type="submit" onClick={() => props.editClass(props.id)} value="Edit Class Name" />
            <input type="submit" onClick={() => props.deleteTeacher(props.id)} value="Delete Teacher" />
            <br></br>
            
        </div>
    )
}
export default AllTeachers;