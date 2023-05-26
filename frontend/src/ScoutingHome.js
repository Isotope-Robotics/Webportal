import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import logo from "./react-logo.png";
import Footer from './Footer';

function ScoutingHome() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
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
    const handleClick = () => {
        navigate("/");
    }

    return (
        <div className="container">

                {
                    auth ?
                        <div>
                            <div className='d-flex justify-content-end'>
                                <p>Signed In As: {name}</p>
                            </div>

                            <div className="Welcome">
                                <h1>Welcome to the Convergence Web Portal</h1>
                            </div>

                            <div className="Info">
                                <p>To start scouting click on Pit Scouting or Match Scouting but login before you do so.
                                    <br/>
                                    To view scouting results and team lists visit the results page.</p>
                                    <br/>
                                <p>To Log Hours For Mechatronics Lab go to Log Hours</p>
                            </div>

                            <div className="react-logo-container" >
                                <p>Built With</p>
                                <img src={logo} alt='React-Logo' width={'1300%'} height={'auto'} className='image-react' />
                            </div>
                        </div>

                        :
                      
                            <div className='Welcome'>
                                <p>Sorry You Have to be Logged In To See This Page</p>
                                <button className='btn btn-success'>Return to Home</button>
                            </div>
                       
                }

            <Footer />
        </div>
    )
}

export default ScoutingHome