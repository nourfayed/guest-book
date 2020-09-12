import React from 'react';
import RegisterForm from './registerform';
import LoginForm from './loginform';
import {Row, Col} from 'react-bootstrap';
import guestBookImage from '../Guest_Book.png'

function HomePage(){
    return<div>  <LoginForm/>
    <Row className="justify-content-md-center">
        <Col>
        <img src={guestBookImage} class="card-img-top" alt="..."></img>
        </Col>
        <Col>
          <RegisterForm/>
        </Col>
    </Row>
</div>
}


export default HomePage;