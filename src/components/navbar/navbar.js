import React from 'react';
import {Link } from 'react-router-dom';
import logoutPicture from './l.png';
import axios from 'axios';

function NavBar(){
  const logout = () => {
    console.log("In the logout function...");
    const token = JSON.parse(sessionStorage.getItem('userToken')); //fetch l token and parse it 3ashan hanb3to fl body bta3 l request
    sessionStorage.removeItem('userToken'); 
     
    axios.post('http://localhost:8000/users/logout', { 
        token
      })
      .then(res => {
       console.log(res.data); 
      })
    window.location.reload();
  }
    return (<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
   
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      <li class="nav-item">
          <Link  className="nav-link" to="/messages/" > Messages  </Link> 
        </li>
        <li class="nav-item">
        <Link  className="nav-link" to="/profile/" > Profile  </Link> 
        </li>
        {/* <li class="nav-item">
        <Link  className="nav-link" to="/home/" > Home  </Link>
        </li> */}
        </ul>
    </div>
    <div className="d-flex justify-content-end ">
        <Link  to="/"> <img  class="img" src={logoutPicture} style={{width:'30px', height:'30px'}} onClick={()=>logout()}/></Link> 
        </div>
  </nav>);
}

export default (NavBar);