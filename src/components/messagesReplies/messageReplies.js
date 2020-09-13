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
        <Card style={{ width: '40rem' , margin  :'10px' ,  borderWidth:'2px'}}>
                <Card.Body>
                  <Card.Title> {ownersEmail} :</Card.Title>
                  <Card.Text>
                    {messageText}  
                  </Card.Text>
                </Card.Body>
                <div style={{ marginLeft:'150px',width: '40rem', display:'inline'}}>
                    <Button variant="danger" onClick={deleteMessage} > Delete Message </Button>
                    <Button variant="success" onClick={deleteMessage} > Edit Message </Button>
                </div>
        </Card>
        {replies.map((item)=>{
                return <Card style={{ width: '30rem' ,marginLeft:'50px'}}>
                <Card.Body>
                  <Card.Title>{item.replierEmail} :</Card.Title>
                  <Card.Text>
                      {item.replyText} 
                  </Card.Text>
                </Card.Body>
              </Card>
            })}
        
        <Form onSubmit={addReply} style={{ width: '30rem' ,marginLeft:'50px'}} >
        <Form.Control type="text" placeholder="add your reply" value = {newReply}  onChange={e => setNewReply(e.target.value)}/>
        <Button  className="btn-warning" variant="primary" type="submit"> Reply </Button>
        </Form>
        

    </div>);
}

export default MessageReplies;