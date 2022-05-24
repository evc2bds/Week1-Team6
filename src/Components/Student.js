function Student(props) {
    return (
      <div className="student">
        <h2>Last Name: {props.lname}</h2>
        <h3>First Name: {props.fname}</h3>
        <p>GPA: {props.grade} </p>
        
      </div>
    );
  }
  
  export default Student;