import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './Login.css';

function Express() {
    const [values, setValues] = useState({
        code: ''
    });

    const navigate = useNavigate();
    //Handle express login
    axios.defaults.withCredentials = true;
    const handleExpress = (event) => {
        event.preventDefault();
        axios.post('/api/auth/express', values, {
            withCredentials: true
        })

            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/ScoutingHome');
                    window.location.reload(true);
                } else {
                    alert(res.data.Error);
                    window.location.reload(false);
                }
            })
            .then(err => console.error(err))
    }

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('/api/token', {
            withCredentials: true
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/ScoutingHome")
                }
            })
            .then(err => console.error(err))
    })

    return (
        <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
            <div className='bg-white p-3 rounded signin-custom'>
                <h2>Express Log In</h2>
                <form onSubmit={handleExpress}>
                    <div className='mb-3'>
                        <label>Express Code:</label>
                        <input type='password' placeholder='Enter 4 Digit Code' className='form-control rounded-0' onChange={(e) => setValues({ ...values, code: e.target.value })}></input>
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
                    </div>
                </form>
                <div>
                    <p><a href='/login'>Click Here to Access Normal Login</a></p>
                </div>
                <div>
                    <p> By logging in you agree to FRC Team 9709s terms and agreements</p>
                    <div className='mb-3'>
                        <Alert key='warning' variant='warning' style={{ textAlign: 'center' }}>If you cannot login please contact: <br /> <a href="mailto: ethenbrandenburg@gmail.com">Ethen Brandenburg</a></Alert>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Express