import React ,{useState , useEffect} from 'react';
import RegisterForm from '../registerform/registerform';
import LoginForm from '../loginform/loginform';
import {Row, Col} from 'react-bootstrap';
import styles from './homepage.module.css'
import classnames from 'classnames';
import image from './guestbook.png'


function HomePage(){
  
    return<div> 
    <Row className="d-flex justify-content-end ">  <LoginForm/></Row>
    <Row >  
        <Col style={{marginLeft:'100px'}}><img src={image} class="img-fluid" /> </Col>
        <Col className="d-flex justify-content-end " style={{marginRight:'80px'}}><RegisterForm/></Col> 
    </Row>
</div>
}


export default HomePage;