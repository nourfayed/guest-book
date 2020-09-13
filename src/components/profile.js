import React , {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import axios from 'axios';
import {Link } from 'react-router-dom';

function UserProfile(){
    const userId ="5f5d1ec699a79f52a9057659";
    let urlMessages = "http://localhost:8000/messages/";
    let urlUsers = "http://localhost:8000/users/";
    const [usersMessages, setusersMessages] = useState([]);
    const [userInfo, setuserInfo] = useState({});
    const getUserInfo = () => {
        axios.get(urlUsers + userId )
        .then(res =>{
            setuserInfo(res.data)
        }
        )
    }
    const getUsersMessages = () =>{
        console.log( userInfo.ownersEmail);
        axios.get(urlMessages +'/user/'+ userId )
        .then(res => 
            setusersMessages(res.data))

    } 
    useEffect(()=>{
        getUserInfo();
        getUsersMessages();
    },[])
    
    return <div>
        <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
            <Card.Body>
            <Card.Title> {userInfo.firstName} {userInfo.lastName}</Card.Title>
            <Card.Text>
                email : {userInfo.email}  
            </Card.Text>
            </Card.Body>
        </Card>
        <h3>Your Messages</h3>
        {usersMessages.map((item)=>{
            return  <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
            <Card.Body>
              <Card.Text>
                {item.messageText}  eqtytiurei utqieyrpwuyi   iiouwao 
              </Card.Text>
             <Card.Link style={{marginLeft:'20%'}} href={"http://localhost:8000/messages/"+item._id} >See Message Replies</Card.Link>
            </Card.Body>
          </Card> 
        })
        }
        </div>
}

export default UserProfile;