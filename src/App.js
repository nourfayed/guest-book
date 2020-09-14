import React , {useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Messages from './components/messages/messages'
import MessageReplies from './components/messagesReplies/messageReplies'
import HomePage from './components/homepage/homepage'
import UserProfile from './components/profile/profile'
import NavBar from './components/navbar/navbar'
import EditMessage from './components/editMessage/editMessage'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userId, setUserId] = useState("")
  const getUserIdFromToken =() =>{
  
    const token = sessionStorage.getItem('userToken'); 
    axios.get('http://localhost:8000/users/getUser/'+token)
        .then(res => {
          setUserId(res.data._id)
          console.log("The user id is "+res.data); 
        })
}
useEffect(()=>{
  getUserIdFromToken();
},[])
  return (   
     
    <BrowserRouter>
     <NavBar/>
    {/* {sessionStorage.getItem("userToken") ?  <NavBar/>:<Redirect to='/' /> } */}
    <div style={{ backgroundColor :'aquamarine', width:'100%',height:'100%'}}>
     <Switch>
    
         <Route  path="/messages/:id">  <MessageReplies/> </Route>
         <Route  path="/messages">  <Messages/> </Route>
         <Route  path="/profile/:id">  <UserProfile/> </Route>
         <Route  path="/editMessage/:id">  <EditMessage/> </Route>
         <Route exact path="/" > <HomePage/> </Route>     
      </Switch>
      </div>  
  </BrowserRouter>
 
  // <NavBar/>
  );
}

export default App;
