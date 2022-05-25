// import React, { useRef} from 'react'
function Student(props) {
  // const textFieldRefEditFirst = useRef(null);
  // const textFieldRefEditLast = useRef(null);
  // const textFieldRefGPA = useRef(null);
    return (
      <div className="student">
      <br></br>
      <p>Name: {props.lastName}, {props.firstName} | GPA: {props.stuGPA}</p>
      <input type="submit" onClick={() => props.editFirstName(props.id)} value="Edit First Name" />
      <input type="submit" onClick={() => props.editLastName(props.id)} value="Edit Last Name" />
      <input type="submit" onClick={() => props.editGPA(props.id)} value="Edit GPA (4.0 scale)" />
      <input type="submit" onClick={() => props.deleteStudent(props.id)} value="Delete Teacher" />
      <br></br>
      
  </div>
    );
  }
  
  export default Student;