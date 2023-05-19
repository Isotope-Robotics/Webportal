import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Pit.css';
import Footer from './Footer';

function Pit() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true,
      headers: {
        'Authorization' : localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.user);
        } else {
          setAuth(false);
          setName("Not Signed In")
        }
      })
      .then(err => console.error(err))
  })

  return (
    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
       

      <div className='bg-white p-3 rounded signin-custom'>
        <h2>Pit Scouting</h2>
        <form >
          <div className='mb-3'>
            <label htmlFor='teamNumber'><strong>Team Number:</strong></label>
            <input type='text' placeholder='Enter Team Number' name='teamNumber' className='form-control rounded-0' ></input>
          </div>
      
          <div className='mb-3'>
            <label htmlFor='robotWeight'><strong>Robot Weight:</strong></label>
            <input type='text' placeholder='Enter Robot Weight' name='robotWeight' className='form-control rounded-0' ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotHeight'><strong>Robot Height:</strong></label>
            <input type='text' placeholder='Enter Robot Height' name='robotHeight' className='form-control rounded-0' ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotLength'><strong>Robot Length:</strong></label>
            <input type='text' placeholder='Enter Robot Length' name='robotLength' className='form-control rounded-0' ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Width:</strong></label>
            <input type='text' placeholder='Enter Robot Width' name='robotWidth' className='form-control rounded-0' ></input>
          </div>


          <div className='mb-3'>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Save</button>
           
            <div className='mb-3'>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Pit