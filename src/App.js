import React from 'react';
import './App.css';
import Messages from './components/messages'
import MessageReplies from './components/messageReplies'
import HomePage from './components/homepage'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    //  <Messages/>
     <BrowserRouter>
     <Switch>
         <Route  path="/messages/:id">  <MessageReplies/> </Route>
         <Route exact path="/" > <HomePage/> </Route>     
     </Switch>
 </BrowserRouter>
  );
}

export default App;
