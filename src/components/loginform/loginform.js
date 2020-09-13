import React , { useState } from 'react';
import {Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
// import login from '../../assests/login.svg'

function LoginForm() {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [redirectPage,setRedirectState]= useState(null)

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(email);
  console.log(password);

  axios.post('http://localhost:8000/users/login', {
      email,
      password
    })
    .then(res => {
      if(res.status == 200){
        console.log(JSON.stringify(res.data));
        sessionStorage.setItem('userToken', JSON.stringify(res.data)) //add the token to the session storage as a string
        alert("You are successfully logged in")

         window.location.reload();
      }  
    })
    .catch(function (error) {
      console.log(error);
      alert("Wrong email or/and password ")
    })
    setEmail('')
    setPassword('')
}
const getUserIdFromToken =() =>{
  
const token = sessionStorage.getItem('userToken'); //fetch stringified token from session storage
axios.get('http://localhost:5000/users/getUser/'+token)//bnb3to fl url fa asibo string 3adi
    .then(res => {
      console.log("The user id is "+res.data); // aho l id aho aho.......
    })
}
if(redirectPage)return  <Redirect  to="/categories" />
  return (<div  style={{marginRight:'25px'}}>
    
           <Form onSubmit={handleSubmit} style={{ display : 'inline'}} >
            <Form.Row>
              
              <Form.Group controlId="formGroupEmail">
                  <Form.Control type="email" placeholder="email"  value={email} onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
        
              <Form.Group controlId="formGroupPassword">
                  <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
                  
              <Button type="submit " className="mb-2 d-flex justify-content-center btn btn-warning"  >Login</Button>
                
            </Form.Row>
         </Form>
       
         
     </div>);
}
export default LoginForm;