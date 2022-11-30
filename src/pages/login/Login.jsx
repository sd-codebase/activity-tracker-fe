import React, { useState } from 'react';
import './login.scss';
import { Button, Form, Container, Header, Icon, Message } from 'semantic-ui-react'
import { StorageService } from '../../services/storage.service';
import axios from 'axios';
import { url } from '../../services/url.service';

const Login = ({setIsAuthorized, setIsAdmin}) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const [message, setMessage] = useState({show: false});

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enableView = (view) => {
    if (view === 'login') {
      setIsLoginView(true);
    } else if (view === 'register') {
      setIsLoginView(false);
    }
  }

  const showMessage = (type, text) => {
    setMessage({show: true, type, text});
    const timer = setTimeout(() => {
      if (setMessage) {
        setMessage({show: false});
      }
      if (timer) {
        clearTimeout()
      }
    }, 2000);
  }

  const register = async () => {
    try {
      await axios.post(url('auth/register'), {username, email, password});
      setIsLoginView(true);
      showMessage('green', 'Registered! Login now');
    } catch (error) {
      showMessage('red', 'Error while sign up');
    }
  }

  const logIn = async () => {
    try {
      const {data} = await axios.post(url('auth/login'), {email, password});
      StorageService.setItem('token', data.accessToken);
      StorageService.setItem('isAdmin', data.isAdmin);
      setIsAuthorized(true);
      setIsAdmin(data.isAdmin);
      showMessage('green', 'Logged in successful');
    } catch (error) {
      showMessage('red', 'Error while login');
    }
    
  }

  return (
    <Container>
      <Header as='h2' icon textAlign='center'>
        <Icon name='heartbeat' circular />
        <Header.Content>Activity Tracker</Header.Content>
      </Header>
      <div className="login-container">
        <Form className='login-form'>
          { message.show && (
              <Message color={message.type}>{message.text}</Message>
            )
          }
          {isLoginView ? (
            <>
              <Header as='h3' textAlign='center'>Login</Header>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Field>
              <Button type='submit' primary onClick={logIn}>Sign In</Button>
              <p>Not yet Registered? <strong className='link' onClick={() => {enableView('register')}}>Register Here</strong></p>
            </>
          ) : (
            <>
              <Header as='h3' textAlign='center'>Register</Header>
              <Form.Field>
                <label>User name</label>
                <input placeholder='User name' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Field>
              <Button type='submit' primary onClick={register}>Sign Up</Button>
              <p>Already Registered? <strong className='link' onClick={() => {enableView('login')}}>Login Here</strong></p>
            </>
          )}
        </Form>
      </div>
    </Container>
  )
}

export default Login