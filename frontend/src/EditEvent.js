import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


function EditEvent() {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
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
    const handleBackToLogin = () => {
        navigate('/login');
      }
    

    //Populates state varibles with possible CHS events
    useEffect(() => {
        axios.get('/api/find/events/all')
            .then((res) => setEvents(res.data.results));
    }, []);

    const handleEventName = (e) => {
        setSelectedEvent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = {
            event: selectedEvent
        }
        axios.post('/api/events/editevent', value)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload();
                } else {
                    alert("Error Sending Event Info");
                    window.location.reload();
                }
            })
    }



    return (
        <>
            {isAdmin === "true" ?
                <>
                    <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
                        <div className='bg-white p-3 rounded signin-custom custom'>
                            <form onSubmit={handleSubmit}>
                                <h1>Edit Event:</h1>
                                <label htmlFor='eventName'><strong>Name:</strong></label>
                                {" "}
                                <select className='eventName' onChange={handleEventName}>
                                    <option>Select Event</option>
                                    {events.map((event, index) => {
                                        return (
                                            <option value={event.name}>{event.name}</option>
                                        )
                                    })}
                                </select>
                                <br />
                                <br />
                                <button type='submit' className='btn btn-danger w-20 rounded-2'>Delete Event</button>
                                <Alert variant='info'>At this time editing events is limited to deleting and creating.</Alert>

                            </form>
                        </div>
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

        </>
    )
}

export default EditEvent