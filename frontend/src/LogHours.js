import React from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './LogHours.css';

function LogHours() {
  return (
    <>
      <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
        <div className='bg-white p-3 rounded signin-custom'>
          <h2>Log Hours:</h2>
          <form>
            <div style={{ textAlign: 'center' }}>
              <label>Email: </label> <br />
              {" "}
              <input type='email' required='true' placeholder='Enter Email'></input>
            </div>
            <br />

            <div className='buttons'>
              <button className='btn btn-success w-50 rounded-2'>Sign In</button>
              {" "}
              <button className='btn btn-danger w-50 rounded-2'>Sign Out</button>
            </div>
          </form>

          <Alert variant='primary' style={{ textAlign: 'center' }}>Please log your hours to complete the lab portion of Mechatronics.
            <br />50+ hours required for competiting.
            <br />If you need help contact Ethen or another Mentor.</Alert>
        </div>
      </div>
    </>
  )
}

export default LogHours