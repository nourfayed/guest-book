import React,  {useState, useEffect}  from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import {Card,Form,Button} from 'react-bootstrap';


function MessageReplies(){
    const [messageText,setmessageText]=useState("");
    const [ownersEmail,setownersEmail]=useState("");
    const [replies,setReplies]=useState([]);
    const [newReply,setNewReply]=useState("");
    const [user,setUser] = useState({})
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
    const getUserIdFromToken =() =>{
  
        const token = sessionStorage.getItem('userToken'); 
        axios.get('http://localhost:8000/users/getUser/'+token)
            .then(res => {
              setUser(res.data)
              console.log("The user id is "+res.data); // aho l id aho aho.......
            })
    }
    const addReply=(e)=>{
        e.preventDefault();
        console.log("DAA L USER", user);
        axios.post(url + "newreply/" , { replierEmail:user.email , replyText:newReply , id:messageId })
        .then(res =>{
            getMessage()
            setNewReply("")
           
        })
    }

    useEffect(()=>{
        getMessage();
        getUserIdFromToken();
    },[])
    return (<div> 
        <Card style={{ width: '40rem' , margin  :'10px' ,  borderWidth:'2px'}}>
                <Card.Body>
                  <Card.Title> {ownersEmail} :</Card.Title>
                  <Card.Text>
                    {messageText}  
                  </Card.Text>
                </Card.Body>
                
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
        
        <Form onSubmit={addReply} style={{ width: '30rem' ,marginLeft:'50px',marginTop:'20px'}} >
        <Form.Control type="text" placeholder="add your reply" value = {newReply}  onChange={e => setNewReply(e.target.value)}/>
        <Button  className="btn-warning" variant="primary" type="submit"> Reply </Button>
        </Form>
        

    </div>);
}

export default MessageReplies;