import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Navigation() {

    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [isKiosk, setIsKiosk] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('/api/token', {
            withCredentials: true
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setIsAdmin(res.data.admin);
                    setIsKiosk(res.data.kiosk);
                } else {
                    setAuth(false);
                    setIsAdmin(res.data.admin);
                }
            })
            .then(err => console.error(err))
    })

    const navigate = useNavigate();
    const handleDelete = () => {
        axios.get('/api/auth/logout', {
            withCredentials: true
        })
            .then(res => {
                navigate("/");
            }).catch(err => console.log(err));
    }

    return (
        <Navbar className='bg-custom' variant='dark' expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="/">Isotope Robotics</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {
                            auth ?
                                <>
                                    <Nav.Link href="/ScoutingHome">Home</Nav.Link>
                                    <NavDropdown title="Scouting" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/Pit">Pit</NavDropdown.Item>
                                        <NavDropdown.Item href="/Match">Match</NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown title="Results" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/team_list">Team Info</NavDropdown.Item>
                                        <NavDropdown.Item href="/pit_scouting_list">Pit Info</NavDropdown.Item>
                                        <NavDropdown.Item href="/match_scouting_list">Match Info</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/LogHours">Log Hours</Nav.Link>

                                    {isAdmin === "true" ?
                                        <Nav.Link href="/admin">Admin</Nav.Link>
                                        :
                                        <p></p>
                                    }


                                    {isKiosk === "true" ?
                                        <>
                                            <Nav.Link href="/register">Register New Student/Mentor</Nav.Link>
                                            <Nav.Link href='bob'>hello</Nav.Link>
                                        </>
                                        :
                                        <p></p>
                                    }

                                    <button className='btn btn-danger outline-danger' onClick={handleDelete}>Logout</button>
                                </>
                                :
                                <>
                                    <Nav.Link href='/Login'>Login</Nav.Link>
                                </>

                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation