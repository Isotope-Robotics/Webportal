import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './Register.css';

function RegisterEvent() {

  const [values, setValues] = useState({
    event_code: ''
  });

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/events/add', values)
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Event Registration Is Complete");
          navigate('/scouting_home');
        } else {
          alert("Error Registering New Event");
          const register_form = document.getElementById("register_form");
          register_form.addEventListener('submit', (e) => {
            e.preventDefault();
            register_form.reset();
          })
        }
      })
      .then(err => console.error(err))
  }

  return (
    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
      <div className='bg-white p-3 rounded signin-custom'>
        <h2>New Event</h2>
        <form className='register_form' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label><strong>TBA Event Code:</strong></label>
            {" "}
            <input type="text"style={{ textAlign: 'center' }} placeholder='vapor' onChange={(e) => setValues({...values, event_code: e.target.value})}></input>
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Submit</button>
          </div>
          <Alert style={{ textAlign: 'center' }}>TBA Code Can Be Found On TheBlueAlliance.com 
            <br/>And Searching For The Event. <br/> 
            Example: "vapor" for VA Portsmouth Event.
          </Alert>
        </form>
      </div>
    </div>
  )
}

export default RegisterEvent