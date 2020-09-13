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
    const addReply=(e)=>{
        e.preventDefault();
        axios.post(url + "newreply/" , { replierEmail:"tmp@gmail.com" , replyText:newReply , id:messageId })
        .then(res =>{
            console.log("reg3naaaa", res.data)
            getMessage()
            setNewReply("")
           
        })
    }
    const deleteMessage =(e) =>{
      e.preventDefault();
      axios.delete(url+messageId)
      .then(res =>{
        //redirect 3ala l profile aw l home 
        alert("The message is deleted successfully")
      })

    }
    useEffect(()=>{
        getMessage();
    },[])
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
        <Button variant="danger" onClick={deleteMessage} > Delete Message </Button>
        <Form onSubmit={addReply}>
        <Form.Control type="text" placeholder="add your reply" value = {newReply}  onChange={e => setNewReply(e.target.value)}/>
        <Button variant="primary" type="submit"> Reply </Button>
        </Form>

    </div>);
}

export default MessageReplies;