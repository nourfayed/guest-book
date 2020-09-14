import React,  {useState, useEffect}  from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import {Card,Form,Button} from 'react-bootstrap';
import {Link } from 'react-router-dom';

function EditMessage(){
    const [messageText ,setmessageText] = useState("");
    const params = useParams();
    const messageId = params.id;
    let url = "http://localhost:8000/messages/"
    

    const getMessage =() =>{
        axios.get( url + messageId )
        .then(res =>{
            setmessageText(res.data.messageText);
        })
    }
    const updateMessage = (e) =>{
        e.preventDefault();
        axios.post( "http://localhost:8000/messages/edit", {id:messageId , messageText: messageText})
        .then(res =>{
            // setmessageText(res.data.messageText);
            alert("Message updated successfully!")
            
        })
    }
    useEffect(()=>{
        getMessage();
    },[])
    return  <Card style={{ width: '30rem' , display : 'inline-block' , margin  :'10px' ,  borderWidth:'10px'}}>
            <Form onSubmit={updateMessage} >
                 <Form.Control size="lg" type="text" placeholder={messageText} value={messageText} onChange={e => setmessageText(e.target.value)}/>
                 <Button  className="btn-success" variant="primary" type="submit"> Save </Button>
                 <Link  to={"/profile"} > <Button variant="warning"  > Back </Button>  </Link>
            </Form>
        </Card>

}

export default EditMessage