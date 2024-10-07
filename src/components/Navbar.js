import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';

const CustomNavbar = ({ svgColor, setSvgColor, bgColor, setBgColor, searchTerm, setSearchTerm }) => {
  const handleSvgColorChange = (event) => {
    setSvgColor(event.target.value);
  };

  const handleBgColorChange = (event) => {
    setBgColor(event.target.value); // Update background color state
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">the2px.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline>
            <Form.Control
              type="color"
              value={svgColor}
              onChange={handleSvgColorChange}
              className="mr-2"
            />
            <Form.Control
              type="color"
              value={bgColor}
              onChange={handleBgColorChange} // Handle background color change
              className="mr-2"
            />
            <Form.Control
              type="text"
              placeholder="Search by tags..."
              className="mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
            />
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
