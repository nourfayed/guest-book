import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Card, Button } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import styles from './messages.module.css';
import classnames from 'classnames';

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
        <div className={classnames("card-columns", "ml-5")}>
            
            {allMessages.map((item)=>{
                return <Card className ={styles.card} >
                <Card.Body>
                  <Card.Title> {item.ownersEmail} :</Card.Title>
                  <Card.Text>
                    {item.messageText}  
                  </Card.Text>
                  
                </Card.Body>
                <Card.Footer>
                     <Link  to={"/messages/"+item._id} >  
                     <Button className="btn-warning"> View Replies </Button>
                     </Link>
                  </Card.Footer>
              </Card>
            })}
        </div>);
}
export default (Messages);