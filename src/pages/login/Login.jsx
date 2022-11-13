import React, { useState } from 'react'
import { StorageService } from '../../services/storage.service';

const Login = ({setIsAuthorized, setIsAdmin}) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const enableView = (view) => {
    if (view === 'login') {
      setIsLoginView(true);
    } else if (view === 'register') {
      setIsLoginView(false);
    }
  }

  const logIn = () => {
    StorageService.setItem('token', '1234');
    StorageService.setItem('isAdmin', true);
    setIsAuthorized(true);
    setIsAdmin(true)
  }

  return (
    <> 
      {isLoginView ? (
        <div className="login-container">
        <h2>Login</h2>
        <div className="control username">
          <label>Mobile No</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="control password">
          <label>Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="action">
          <button type="submit" onClick={logIn}>Submit</button>
          <button type="reset">Clear</button>
        </div>
        <p>Not Register <strong className='link' onClick={() => {enableView('register')}}>Register Here</strong></p>
      </div>
      ) : (
        <div className="register-container">
        <h2>Register</h2>
        <div className="control username">
          <label>Mobile No</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="control password">
          <label>Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="action">
          <button type="submit" onClick={() => {enableView('register')}}>Submit</button>
          <button type="reset">Clear</button>
        </div>
        <p>Already Registered <strong className='link' onClick={() => {enableView('login')}}>Login Here</strong></p>
      </div>
      )}
    </>
  )
}

export default Login