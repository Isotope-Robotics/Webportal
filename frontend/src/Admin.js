import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Admin() {

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true,
      headers: {
        'Authorization': localStorage.getItem('token')
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

  const navigate = useNavigate();

  const handleNewEvent = (event) => {
    event.preventDefault();
    navigate('/new_event');
  }

  const handleDeleteEvent = () => {
    navigate('/delete_event');
  }

  const handleEditEvent = () => {
    navigate('/edit_event');
  }

  const handleNewUser = () => {
    navigate('/register');
  }

  const handleDeleteUser = () => {
    navigate('/delete_user');
  }

  return (
    <>
      <div className='header'>
        <h1>Admin Page:</h1>
        <p>Please Note Only Mentors and Teachers Can Edit This Page! <br/>
        Unauthorized Edits Will Result In Executive Action!</p>
      </div>

      { auth ?
        <>
          <div className='events'>
            <h3>Event Settings</h3>
            <form className="forms" onSubmit={handleNewEvent}>
              <button type="submit" className='btn btn-success'>New Event</button>
            </form>
            {" "}
            <form className="forms" onSubmit={handleDeleteEvent}>
              <button type="submit" className='btn btn-danger'>Delete Event</button>
            </form>
            {" "}
            <form className="forms" onSubmit={handleEditEvent}>
              <button type="submit" className='btn btn-info'>Edit Event</button>
            </form>

          </div>

          <br />

          <div className='users'>
            <h3>User Settings</h3>
            <form className="forms" onSubmit={handleNewUser}>
              <button type="submit" className='btn btn-success'>New User</button>
            </form>
            {" "}
            <form className="forms" onSubmit={handleDeleteUser}>
              <button type="submit" className='btn btn-danger'>Delete User</button>
            </form>
          </div>
        </>
      :
      <div className='d-flex justify-content-center' style={{color: 'red'}}>
        <h1>Need To Be Signed In</h1>
      </div>
    }
    </>
  )
}

export default Admin