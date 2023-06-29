import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import './EditUsers.css';

function EditUsers() {

    const [isAdmin, setIsAdmin] = useState('');
    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedPermission, setPermission] = useState('');

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

    useEffect(() => {
        axios.get('/api/auth/users')
            .then(res => {
                if (res.data.Status === "Success") {
                    setUsers(res.data.users);
                }
            })
    }, [])

    const navigate = useNavigate();
    const handleBackToLogin = () => {
        navigate('/login');
    }

    const handleStudentChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSelectedPermission = (e) => {
        setPermission(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
           student: selectedUser,
           permission: selectedPermission
        }

        axios.post('/api/auth/editUser', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload();
                } else {
                    alert("Error Sending User Info");
                    window.location.reload();
                }
            })
    }


    return (
        <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
            <div className='bg-white p-3 rounded signin-custom'>
                <h3>Users:</h3>
                <div className='mb-3'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name:</th>
                                <th>Email:</th>
                                <th>Permissions:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.signInCode}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <form className='editUserForm' onSubmit={handleSubmit}>
                    <div className='edit'>
                        <p>Edit User:</p>
                        <label htmlFor='studentName'><strong>Name:</strong></label>
                        {" "}
                        <select className='selectStudent' onChange={handleStudentChange}>
                            <option>Select Student</option>
                            {users.map((student, index) => {
                                return (
                                    <option>{student.name}</option>
                                )
                            })}
                        </select>
                        <br />
                        <br />
                        <label htmlFor='studentPermission'><strong>Permissions:</strong></label>
                        {" "}
                        <select className='selectPermission' onChange={handleSelectedPermission}>
                            <option>Select Permission</option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                            <option value="mentor">Mentor</option>
                        </select>
                        <br />
                        <br />
                        <button type='submit' className='btn btn-success w-20 rounded-2'>Submit</button>
                    </div>


                </form>
            </div >
        </div >
    )
}

export default EditUsers