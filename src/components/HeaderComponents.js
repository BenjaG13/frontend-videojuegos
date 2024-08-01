import React from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import logo from '../assets/logoo.jpg';

const HeaderComponents = () => {
  return (
    <>
      <Navbar bg="white">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={logo} alt="Logo" width={200} height={30} className="d-inline-block align-top" />{' '}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="nav-link">
              Features
            </Nav.Link>
            <Nav.Link href="#pricing" className="nav-link">
              Pricing
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponents;
