import React ,{useState}from 'react';
import {Form,Button ,Row} from 'react-bootstrap'
// import './RegisterForm.css'
import axios from 'axios';

//confirm password wl email gedid wala la?
function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [cpassword, setcPassword]= useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");
    
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(password != cpassword) alert("Passwords don't match..")
    else {
    axios.post('http://localhost:8000/users/register',{firstName,lastName,email,password} )
    .then(res => {
      console.log("da l res",res);
      sessionStorage.setItem('userToken', JSON.stringify(res.data)) //add the token to the session storage as a string
      setEmail('')
      setPassword('')
      setcPassword('')
      setfirstName('')
      setlastName('')
    })
    .catch(function(error){
      alert("This email already exists ")
    })
  }
  
}
  
  return (<Form   onSubmit={handleSubmit} >
   <h5 class="text-white font-italic"  style={{fontSize:"30px"}}>Create a free account now!</h5>
    
     <Form.Group class="form-control w-50 " as={Row} controlId="validationCustom01">
            <Form.Control  class="form-control "type="text"     value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="First Name"/>
    </Form.Group>
     
    <Form.Group  as={Row}  class="form-control w-50 "controlId="validationCustom02">
             <Form.Control class="form-control " type="text"    value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name"/>
    </Form.Group>
    
    <Form.Group as={Row}class="form-control w-50" controlId="formPlaintextEmail">
           <Form.Control  type="email"    value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address"/>   
  </Form.Group>

  <Form.Group as={Row} class="form-control w-50 " controlId="formPlaintextPassword">
      <Form.Control class="form-control w-50 reg-form-control" type="password"   placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
  </Form.Group>

  <Form.Group as={Row} class="form-control w-50 " controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Confirm Password"   className="justify-content-md-center"  value={cpassword} onChange={e => setcPassword(e.target.value)}/>
  </Form.Group>



<Button type="submit" className="mb-2 d-flex justify-content-center btn btn-warning"  >Register</Button>
</Form>);
}
export default RegisterForm;