// import React, { useRef} from 'react'
import { Button, ButtonGroup } from '@mui/material';
function Student(props) {
 
    return (
      <div className="student">
      <br></br>
      <p >Name: {props.lastName}, {props.firstName} | GPA: {props.stuGPA} | Date of birth: {props.bday}</p>
        <div >
          <ButtonGroup variant='outlined'>
          <Button  onClick={() => props.editFirstName(props.id) }>Edit First Name</Button>
          <Button  onClick={() => props.editLastName(props.id)} >Edit Last Name</Button>
          <Button  onClick={() => props.editGPA(props.id)}  >Edit GPA (4.0 scale)</Button>
          <Button onClick={()=>props.editBirthday(props.id)}>Edit Birthday</Button>
          <Button  onClick={() => props.deleteStudent(props.id)}>Delete Student</Button>
          </ButtonGroup>
        </div>
      <br></br>
      
  </div>
    );
  }
  
  export default Student;