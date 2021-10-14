import React, { Component } from 'react';
import { Navbar, Container, NavbarBrand, Nav, NavDropdown } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Github, Person, PersonFill, PersonX } from "react-bootstrap-icons";


class Auth extends Component {
  state = {
    producerLoginRedirectEndpoint: process.env.REACT_APP_API_URL + '/react_login/',
    producerLoginEndpoint: process.env.REACT_APP_API_URL + '/react_swap_token/',
    producerLogoutEndpoint: process.env.REACT_APP_API_URL + '/logout/',
    producerLoginCheckEndpoint: process.env.REACT_APP_API_URL + '/user/info/',
    userLoggedIn: false,
    userName: null,
  };

  componentDidMount() {
    this.authenticate()
  };

  setCookie = (c_name, c_value, ex_days) => {
    let current_d = new Date();
    current_d.setTime(current_d.getTime() + (ex_days*24*60*60*1000));

    let expires = "expires="+ current_d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
  };

  getCookie = (c_name) => {
    let name = c_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  authenticate = () => {
    // Extract token from url
    let accessToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1];

    if (!accessToken) {
      // Extract token from cookie
      accessToken = this.getCookie('access_token');
    } else {
      // Clear url
      window.history.pushState('object', document.title, "/");
    }

    if (accessToken) {
      // Check token is valid
        this.checkUserSessionStatus(accessToken);
        this.setCookie('access_token', accessToken);        
    } else {
      // There is no token info. Don`t do anything
        console.log('Can`t find token anywhere.');
    }
  }

  checkUserSessionStatus = (accessToken) => {
    const request = {
        method: 'GET',
        headers: {
        "Authorization": "Bearer " + accessToken
        },
        credentials: 'include'
    };

    fetch(this.state.producerLoginCheckEndpoint, request)
    .then(response => {
        if(!response.ok) throw new Error(response.data);
        else return response.json();
      })
    .then(data => {
      this.setState({
        userLoggedIn: true,
        userName: data['username'],
      });
    })
    .catch(err => {})
  };

  logout = () => {
    const request = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + this.getCookie('access_token')
      },
      credentials: 'include'
    }

    fetch(this.state.producerLogoutEndpoint, request)
    .then(response => {
        if(!response.ok) throw new Error(response.data);
        else {this.setCookie('access_token', null); window.location.reload();}
      })
    .catch(err => {})
  }

  login = () => {
    window.location.href = this.state.producerLoginRedirectEndpoint + "?state=" + process.env.REACT_APP_STATE;
  }

  render() {
        const isLoggedIn = this.state.userLoggedIn;
        let nav_profile;
        if (isLoggedIn) {
          nav_profile =
          <>
            <NavDropdown.Item>
              <PersonFill></PersonFill>&nbsp;{this.state.userName}
            </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.logout}>
                <PersonX></PersonX>&nbsp;Log out
              </NavDropdown.Item>
          </>
          } else {
          nav_profile =
            <>
              <NavDropdown.Item onClick={this.login}>
                <Person></Person>&nbsp;Log in
              </NavDropdown.Item>
            </>
          }

      return (
          <>
              <Navbar bg="dark" variant="dark">
                  <Container>
                      <NavbarBrand href="#home">Yet another wishlist maker v.0.1</NavbarBrand>
                      <NavbarToggle />
                      <NavbarCollapse className="justify-content-end">
                          <NavDropdown title="Profile">
                              {nav_profile}
                          </NavDropdown>
                          <Nav.Link href="https://github.com/devalv/yawm-frontend"><Github /></Nav.Link>
                      </NavbarCollapse>
                </Container>
              </Navbar>

          </>
      );
  }
}

export default Auth;