import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {Github, Person, PersonFill, PersonX} from "react-bootstrap-icons";
import React from "react";


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
                <NavDropdown.Item onClick={props.logoutUser}>
                    <PersonX/>
                    &nbsp;Выйти
                </NavDropdown.Item>
            </>)
        }
        else
        {
            return (
            <>
                <NavDropdown.Item onClick={props.loginUser}>
                    <Person/>
                    &nbsp;Войти
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
                        <img
                            alt=""
                            src="/logo64.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        &nbsp;Yet another wishlist maker v.0.1
                    </NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse className="justify-content-end">
                        <NavDropdown title="Профиль" id="ProfileNav">
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
