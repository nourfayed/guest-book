import React,  {useState, useEffect}  from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import {Card,Form,Button} from 'react-bootstrap';


function MessageReplies(){
    const [messageText,setmessageText]=useState("");
    const [ownersEmail,setownersEmail]=useState("");
    const [replies,setReplies]=useState([]);
    const [newReply,setNewReply]=useState("");
    const params = useParams();
    const messageId = params.id;
    let url = "http://localhost:8000/messages/"

    const getMessage =() =>{
        axios.get( url + messageId )
        .then(res =>{
            setmessageText(res.data.messageText);
            setownersEmail(res.data.ownersEmail);
            setReplies(res.data.replies)
           
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(url + "newreply/" , { replierEmail:"tmp@gmail.com" , replyText:newReply , id:messageId })
        .then(res =>{
            console.log("reg3naaaa", res.data)
            setNewReply("")
        })
    }
    useEffect(()=>{
        getMessage();
    })
    return (<div> 
        <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
                <Card.Body>
                  <Card.Title>from {ownersEmail}</Card.Title>
                  <Card.Text>
                    {messageText}  
                  </Card.Text>
                </Card.Body>
        </Card>
        {replies.map((item)=>{
                return <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
                <Card.Body>
                  <Card.Title>from {item.replierEmail}</Card.Title>
                  <Card.Text>
                    {item.replyText} 
                  </Card.Text>
                </Card.Body>
              </Card>
            })}
        <Form onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="add your reply" onChange={e => setNewReply(e.target.value)}/>
        <Button variant="primary" type="submit"> Reply </Button>
        </Form>

    </div>);
}

export default MessageReplies;