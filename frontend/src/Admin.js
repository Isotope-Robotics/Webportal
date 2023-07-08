import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';


function Admin() {
  const [isAdmin, setIsAdmin] = useState('');
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setIsAdmin(res.data.admin);
          setName(res.data.user);
        } else {
          setAuth(false);
          setIsAdmin(res.data.admin);
          setName("No User");
        }
      })
      .then(err => console.error(err))
  })

  const navigate = useNavigate();

  const handleNewEvent = (event) => {
    event.preventDefault();
    navigate('/new_event');
  }

  const handleEditEvent = () => {
    navigate('/editevent');
  }

  const handleNewUser = () => {
    navigate('/register');
  }

  const handleEditUser = () => {
    navigate('/edit_user');
  }

  const handleBackToLogin = () => {
    navigate('/login');
  }


  return (
    <>
      <div className='container'>
        <div className="d-flex justify-content-end">
          {
            auth ?
              <div className='user'>
                <p>Signed In As: {name}</p>
              </div>
              :
              <div className='user'>
                <p></p>
              </div>
          }
        </div>
      </div>



      {isAdmin === "true" ?
        <>
          <div className='header'>
            <h1>Admin Page:</h1>
          </div>
          <div className='events'>
            <h3>Event Settings</h3>
            <form className="forms" onSubmit={handleNewEvent}>
              <button type="submit" className='btn btn-success'>New Event</button>
            </form>
            {" "}
            <form className="forms" onSubmit={handleEditEvent}>
              <button type="submit" className='btn btn-danger'>Edit Event</button>
            </form>
          </div>

          <br />

          <div className='users'>
            <h3>User Settings</h3>
            <form className="forms" onSubmit={handleNewUser}>
              <button type="submit" className='btn btn-success'>New User</button>
            </form>
            <form className="forms" onSubmit={handleEditUser}>
              <button type="submit" className='btn btn-danger'>Edit User</button>
            </form>
          </div>
        </>
        :
        <>
          <div className='d-flex justify-content-center' style={{ color: 'red' }}>
            <h1>Sorry You Need To Be An Admin To View This Page</h1>
          </div>

          <>
            <form className='d-flex justify-content-center' onSubmit={handleBackToLogin}>
              <button type='submit' className='btn btn-info'>Back to Login</button>
            </form>
          </>
        </>
        
      }
      <br/>
    </>

  )
}

export default Admin