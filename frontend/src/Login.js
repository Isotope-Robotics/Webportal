import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './Login.css';

function Login() {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/api/auth/login', values, {
      withCredentials: true
    })
    
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/home');
          window.location.reload(true);
        } else {
          alert(res.data.Error);
          window.location.reload(false);
        }
      })
      .then(err => console.error(err))
  }



  return (
    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
      <div className='bg-white p-3 rounded signin-custom'>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email:</strong></label>
            <input type='email' placeholder='Enter Email' name='email' className='form-control rounded-0' onChange={(e) => setValues({ ...values, email: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password:</strong></label>
            <input type='password' placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={(e) => setValues({ ...values, password: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
            <p> By logging in you agree to FRC 7429 Team's terms and agreements</p>
            <div className='mb-3'>
              <Alert key='warning' variant='warning' style={{ textAlign: 'center' }}>If you cannot login please contact: <br />Ethen Brandenburg or Paul Lathrop</Alert>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login