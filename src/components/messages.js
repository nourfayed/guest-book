import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Card } from 'react-bootstrap';
import {Link } from 'react-router-dom';

function Messages(){
    const [allMessages, setallMessages] = useState([]);
    const getAllMessages = () =>{
        let url = "http://localhost:8000/messages"
        axios.get( url )
        .then( res =>{
            setallMessages(res.data)
        } )
    }
    useEffect(()=>{
        getAllMessages();
    },[])
    return ( 
        <div>
            <h3 > All New Messages!</h3>
            {allMessages.map((item)=>{
                return <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
                <Card.Body>
                  <Card.Title>from {item.ownersEmail}</Card.Title>
                  <Card.Text>
                    {item.messageText}  eqtytiurei utqieyrpwuyi   iiouwao 
                  </Card.Text>
                 <Link style={{marginLeft:'20%'}} to={"/messages/"+item._id} >See Message Replies</Link>
                </Card.Body>
              </Card>
            })}
        </div>);
}
export default (Messages);