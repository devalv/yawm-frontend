import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {Github, Person, PersonFill, PersonX} from "react-bootstrap-icons";
import React, {useState} from "react";


function NavbarC(props) {

    const NavProfile = () => {
        if (props.authenticated)
        {
            return (
            <>
                <NavDropdown.Item>
                    <PersonFill/>
                    &nbsp;{props.username}
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                {/*TODO: @devalv use react route?*/}
                <NavDropdown.Item onClick={props.logout}>
                    <PersonX/>
                    &nbsp;Log out
                </NavDropdown.Item>
            </>)
        }
        else
        {
            return (
            <>
                {/*TODO: @devalv use react route?*/}
                <NavDropdown.Item onClick={props.login}>
                    <Person/>
                    &nbsp;Log in
                </NavDropdown.Item>
             </>
       )
       }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavbarBrand href="/">
                        Yet another wishlist maker v.0.1
                    </NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse className="justify-content-end">
                        <NavDropdown title="Profile" id="ProfileNav">
                            <NavProfile />
                        </NavDropdown>
                        <Nav.Link href="https://github.com/devalv/yawm-frontend">
                            <Github/>
                        </Nav.Link>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </>
        );
}

export default NavbarC;
