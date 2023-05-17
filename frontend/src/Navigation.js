import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Navigation() {

    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081', {
            withCredentials: true
          })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            })
            .then(err => console.error(err))
    })

    const handleDelete = () => {
        axios.get('http://localhost:8081/api/auth/logout', {
            withCredentials: true
          })
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
    }

    return (
        <Navbar className='bg-custom' variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href="/">Convergence Robotics</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            auth ?
                                <div className='d-flex'>
                                    <Nav.Link href="/Pit">Pit</Nav.Link>
                                    <Nav.Link href="/Match">Match</Nav.Link>
                                    <button className='btn btn-danger outline-danger' onClick={handleDelete}>Logout</button>
                                </div>
                                :
                                <div className='d-flex'>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href='/About'>About</Nav.Link>
                                    <NavDropdown title="FIRST" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/FLL">FLL</NavDropdown.Item>
                                        <NavDropdown.Item href="/FTC">FTC</NavDropdown.Item>
                                        <NavDropdown.Item href="/FRC">FRC</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href='/Login'>Login</Nav.Link>
                                </div>

                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation