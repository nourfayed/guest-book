import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Card } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import styles from './messages.module.css';

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
        <div className="card-columns ml-5">
            
            {allMessages.map((item)=>{
                return <Card className ={styles.card} >
                <Card.Body>
                  <Card.Title> {item.ownersEmail} :</Card.Title>
                  <Card.Text>
                    {item.messageText}  
                  </Card.Text>
                  <Card.Footer>
                     <Link  to={"/messages/"+item._id} >  
                     <button className="btn-warning"> View Replies </button>
                     </Link>
                  </Card.Footer>
                </Card.Body>
              </Card>
            })}
        </div>);
}
export default (Messages);