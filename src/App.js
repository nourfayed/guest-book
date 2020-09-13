import React from 'react';
import './App.css';
import Messages from './components/messages'
import MessageReplies from './components/messageReplies'
import HomePage from './components/homepage'
import UserProfile from './components/profile'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
      // <UserProfile/>
      // <Messages/>
     <BrowserRouter>
     <Switch>
         <Route  path="/messages/:id">  <MessageReplies/> </Route>
         <Route exact path="/" > <Messages/> </Route>     
     </Switch>
 </BrowserRouter>
  );
}

export default App;
