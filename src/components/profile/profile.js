import React , {useState, useEffect} from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {Link } from 'react-router-dom';
import { useParams } from "react-router";

function UserProfile(){
    let urlMessages = "http://localhost:8000/messages/";
    const [usersMessages, setusersMessages] = useState([]);
    const [userInfo, setuserInfo] = useState({});
    const [newMsg , setnewMsg ] = useState("");

    const params = useParams();
    const userId = params.id;
   
    const getUserIdFromToken =() =>{
  
        const token = sessionStorage.getItem('userToken'); 
        axios.get('http://localhost:8000/users/getUser/'+token)
            .then(res => {
                setuserInfo(res.data)
              console.log("The user id is "+res.data); 
            })
    }
    const getUsersMessages = () =>{
        
        axios.get(urlMessages +'user/'+ userId )
        .then(res => 
            setusersMessages(res.data))

    } 
    const addNewMessage = (e) =>{
        e.preventDefault();
        axios.post(urlMessages, {messageText:newMsg , ownersEmail:userInfo.email})
        .then(res => {
            alert("Your Message added successfully")
            setnewMsg("")
            getUsersMessages()
         }
        )
    

    }
    const deleteMessage =(e,messageId) =>{
        e.preventDefault();
        axios.delete(urlMessages+messageId)
        .then(res =>{
          alert("The message is deleted successfully")
          window.location.reload();
        })
    }
    useEffect(()=>{
        getUserIdFromToken();
        getUsersMessages();
    },[])
    
    return <div>
        <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
            <Card.Body>
            <Card.Title> {userInfo.firstName} {userInfo.lastName}</Card.Title>
            <Card.Footer>
            <Card.Text>
                email : {userInfo.email}  
            </Card.Text>
            </Card.Footer>
            </Card.Body>
        </Card>

        <Form onSubmit={addNewMessage}  style={{ width: '30rem',margin  :'10px',display : 'inline-block'}}>
        <Form.Control type="text" placeholder="Add a new message here" value = {newMsg}  onChange={e => setnewMsg(e.target.value)}/>
        <Button className="btn-warning" style={{marginLeft:'350px'}} type="submit"> Add Message </Button>
        </Form>

        <h2>Your Old Messages</h2>
        {usersMessages.map((item)=>{
            return  <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
            <Card.Body>
              <Card.Text>
                {item.messageText}  
              </Card.Text>
             <Link  to={"/messages/"+item._id} > <Button className="btn-warning"> View Replies </Button> </Link>
            </Card.Body>
           
            <div style={{ marginLeft:'150px',width: '40rem', display:'inline'}}>
                    <Button variant="danger" onClick={(e) => {deleteMessage(e,item._id)}} > Delete Message </Button>
                    <Link  to={"/editMessage/"+item._id} ><Button variant="success" > Edit Message </Button></Link>
            </div>
          </Card> 
        })
        }
        </div>
}

export default UserProfile;