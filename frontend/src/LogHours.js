import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import './LogHours.css';

function LogHours() {
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  
  const [hours, setHours] = useState({
    name: '',
    hours: '',
    total: ''
  });


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.user);
        } else {
          setAuth(false);
          setName("");
        }
      })
      .then(err => console.error(err))
  }, [])


  const navigate = useNavigate();


  const submitSignOut = (event) => {
    event.preventDefault();
    axios.post('/api/hours/signout', { user: name })
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Sign Out Success");
          navigate('/ScoutingHome');
        } else {
          alert("Looks like you are not signed in...lets redirect you");
          navigate('/login');
        }
      })
      .then(err => console.error(err))
  }

  const submitSignIn = (event) => {
    event.preventDefault();
    axios.post('/api/hours/signin', { user: name })
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Sign In Success");
          navigate('/ScoutingHome');
        } else {
          alert("Looks like you are not signed in...lets redirect you");
          navigate('/login');
        }
      })
      .then(err => console.error(err))
  }

  const submitCheckHours = (event) => {
    event.preventDefault();
    axios.get('/api/hours/getAllHours', {user: name})
      .then(res => {
        if (res.data.Status === "Success") {
          //add stuff here
        } else {
          //add stuff here
        }
      })
      .then(err => console.error(err))
  }


  return (
    <>
      <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
        <div className='bg-white p-3 rounded signin-custom'>
          <h2><strong>Log Hours</strong></h2>
          <br></br>
          <form>
            {" "}
            <div className='buttons'>
              <button type='submit' className='btn btn-success w-50 rounded-2' onClick={submitSignIn}>Sign In</button>
              {" "}
              <button type='submit' className='btn btn-danger w-50 rounded-2' onClick={submitSignOut}>Sign Out</button>
              {" "}
            </div>
          </form>

          <Alert variant='primary' style={{ textAlign: 'center' }}>
            Please scan the QR Code at the build space and the events in order to sign in and out.
            <br />
            If you need help siging in please contact: Ethen B.
          </Alert>
        </div>
      </div>
    </>
  )
}

export default LogHours