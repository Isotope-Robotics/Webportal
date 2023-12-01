import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './Register.css';
import Footer from './Footer';

function Register() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    signInCode: '',
    express_code: ''
  });

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/auth/register', values, {
      withCredentials: true
    })
      .then(res => {
        if (res.data.Status === "Success") {
          alert("User Registration Complete");
          navigate('/');
        }
        else {
          alert("Error Registering New User, Try Logging In Instead");
        }
      })
      .then(err => console.error(err))
  }

  return (
    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
      <div className='bg-white p-3 rounded signin-custom'>
        <h2>Sign Up</h2>
        <form className='registration' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name:</strong></label>
            <input type='text' placeholder='Enter Name' name='name' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, name: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email:</strong></label>
            <input type='email' placeholder='Enter Email' name='email' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, email: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password:</strong></label>
            <input type='password' placeholder='Enter Password' name='password' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, password: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='yearCode'><strong>Sign Up Code: (Code from Ethen)</strong></label>
            <input type='text' placeholder='Enter Code' name='yearCode' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, signInCode: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='expressCode'><strong>Express Code:</strong></label>
            <input type='password' placeholder='Enter Express Code'className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, express_code: e.target.value })}></input>
          </div>
          <div className='mb-3'>
            <Alert key='warning' variant='warning' style={{ textAlign: 'center' }}>If you do not have a Sign Up Code please contact Ethen Brandenburg</Alert>
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
            <p> By registering you agree to FRC 9709 Team's terms and agreements</p>
            <Link to="/Login" type='input' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register