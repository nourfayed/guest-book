import React from 'react';
import './App.css';
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
  
  return (   
     
    <BrowserRouter>
     <NavBar/>
    {/* {sessionStorage.getItem("userToken") ?  <NavBar/>:<Redirect to='/' /> } */}
    <div style={{ backgroundColor :'aquamarine', width:'100%',height:'100%'}}>
     <Switch>
    
         <Route  path="/messages/:id">  <MessageReplies/> </Route>
         <Route  path="/messages">  <Messages/> </Route>
         <Route  path="/profile">  <UserProfile/> </Route>
         <Route  path="/editMessage/:id">  <EditMessage/> </Route>
         <Route exact path="/" > <HomePage/> </Route>     
      </Switch>
      </div>  
  </BrowserRouter>
 
  // <NavBar/>
  );
}

export default App;
