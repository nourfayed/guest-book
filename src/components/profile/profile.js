import React , {useState, useEffect} from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {Link } from 'react-router-dom';

function UserProfile(){
    const userId ="5f5d1ec699a79f52a9057659";
    let urlMessages = "http://localhost:8000/messages/";
    let urlUsers = "http://localhost:8000/users/";
    const [usersMessages, setusersMessages] = useState([]);
    const [userInfo, setuserInfo] = useState({});
    const [newMsg , setnewMsg ] = useState("");

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
    useEffect(()=>{
        getUserInfo();
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
             {/* <Link style={{marginLeft:'20%'}} to={"/messages/"+item._id} >See Message Replies</Link> */}
             <Link  to={"/messages/"+item._id} >  
                     <button className="btn-warning"> View Replies </button>
                     </Link>
            </Card.Body>
          </Card> 
        })
        }
        </div>
}

export default UserProfile;