import React from 'react';
import RegisterForm from '../registerform/registerform';
import LoginForm from '../loginform/loginform';
import {Row, Col} from 'react-bootstrap';
import styles from './homepage.module.css'
import classnames from 'classnames';

function HomePage(){
    return<div> 
    <Row className="d-flex justify-content-end ">  <LoginForm/></Row>
    <Row className="d-flex justify-content-end " style={{marginRight:'80px'}}>  <RegisterForm/> </Row>
</div>
}


export default HomePage;