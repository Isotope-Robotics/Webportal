import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import Navigation from './Navigation';

function Login() {
  return (
    <>
    <Navigation/>
    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
    <div className='bg-white p-3 rounded signin-custom'>
      <h2>Log In</h2>
      <form>
        <div className='mb-3'>
          <label htmlFor='email'><strong>Email:</strong></label>
          <input type='email' placeholder='Enter Email' name='email' className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='password'><strong>Password:</strong></label>
          <input type='password' placeholder='Enter Password' name='password' className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
          <p> By logging in you agree to FRC 7429 Team's terms and agreements</p>
          <div className='mb-3'>
            <Alert key='warning' variant='warning' style={{textAlign: 'center'}}>If you cannot login please contact: <br/>Ethen Brandenburg or Paul Lathrop</Alert>
          </div>
        </div>
      </form>
    </div>
  </div>
  </>
  )
}

export default Login