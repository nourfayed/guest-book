import React , {useState}from 'react';
import {Link } from 'react-router-dom';
import logoutPicture from './l.png';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function NavBar(){
  const [redirectPage,setRedirectState]= useState(null)
  const logout = () => {
    const token = JSON.parse(sessionStorage.getItem('userToken')); //fetch l token and parse it 3ashan hanb3to fl body bta3 l request
    sessionStorage.removeItem('userToken'); 
    setRedirectState(1)
    axios.post('http://localhost:8000/users/logout', { 
        token
      })
      .then(res => {
       console.log(res.data); 
      })
      if(redirectPage)return  <Redirect  to="/" />
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
        {sessionStorage.getItem("userToken") ?  
        <li class="nav-item">
        <Link  className="nav-link" to="/profile/" > Profile  </Link> 
        </li>
        :<Redirect to='/' /> }
        
        </ul>
    </div>
    {sessionStorage.getItem("userToken") ?  
    <div className="d-flex justify-content-end ">
        <Link  to="/"> <img  class="img" src={logoutPicture} style={{width:'30px', height:'30px'}} onClick={()=>logout()}/></Link> 
    </div>
      :<Redirect to='/' /> }
  </nav>);
}

export default (NavBar);