import React from 'react';
import {Link } from 'react-router-dom';

function NavBar(){
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
        <li class="nav-item">
        <Link  className="nav-link" to="/home/" > Home  </Link> 
        </li>
      </ul>
      
    </div>
  </nav>);
}

export default (NavBar);