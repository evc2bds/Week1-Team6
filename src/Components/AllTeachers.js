import { Button, ButtonGroup } from '@mui/material';

function AllTeachers(props) {
    return (
        <div className="teacher">
            <br></br>
            <p>Name: {props.lastName}, {props.firstName} | Class: {props.className}</p>
            <ButtonGroup variant='outlined'>
            <Button  onClick={() => props.editFirstName(props.id) }>Edit First Name</Button>
            <Button  onClick={() => props.editLastName(props.id)} >Edit Last Name</Button>
            <Button  onClick={() => props.editClassName(props.id)}  >Edit Class</Button>
            <Button  onClick={() => props.deleteTeacher(props.id)}>Delete Teacher</Button>
            </ButtonGroup>
            <br></br>
        </div>
    )
}
export default AllTeachers;