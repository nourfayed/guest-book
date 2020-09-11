import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Card , Row , Col} from 'react-bootstrap'

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
    })
    return ( 
        <div>
            <h3 > A New Message!</h3>
            {allMessages.map((item)=>{
                return <Card style={{  display : 'inline-block' }}>
                <Card.Body>
                  <Card.Title>from {item.ownersEmail}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    {item.messageText}
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            })}
        </div>);
}
export default (Messages);