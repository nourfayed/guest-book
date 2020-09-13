import React from 'react';
import RegisterForm from './registerform';
import LoginForm from './loginform';
import {Row, Col} from 'react-bootstrap';
import guestBookImage from '../Guest_Book.png';
import styles from './homepage.module.css'
import classnames from 'classnames';

function HomePage(){
    return<div>  <LoginForm/>
    <Row className={classnames(styles.homePage,)}>
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