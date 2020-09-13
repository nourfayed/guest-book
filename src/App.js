import React from 'react';
import './App.css';
import Messages from './components/messages/messages'
import MessageReplies from './components/messagesReplies/messageReplies'
import HomePage from './components/homepage/homepage'
import UserProfile from './components/profile/profile'
import NavBar from './components/navbar/navbar'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  return (     
      <div style={{ backgroundColor :'aquamarine', width:'100%',height:'100%'}}>
    
     
     <BrowserRouter>
     <NavBar/>

     <Switch>
         <Route  path="/messages/:id">  <MessageReplies/> </Route>
         <Route  path="/messages">  <Messages/> </Route>
         <Route  path="/profile">  <UserProfile/> </Route>
         <Route  path="/home">  <HomePage/> </Route>
         <Route exact path="/" > <HomePage/> </Route>     
      </Switch>
      
  </BrowserRouter>
  </div>
  // <NavBar/>
  );
}

export default App;
