import React, { Component } from 'react';
import {Navbar, Container, NavbarBrand, Nav, NavItem} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";


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
    let accessToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1];

    if (!accessToken) {
        accessToken = this.getCookie('access_token');
    }

    if (accessToken) {
      // Try to get an access token from the server
        console.log('received token from page');
        this.checkUserSessionStatus(accessToken);
        this.setCookie('access_token', accessToken);
        window.history.pushState('object', document.title, "/");

    } else {
      // Check user is logged in
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
  }

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

  render() {
        const googleLogin = () => {
         window.location.href = this.state.producerLoginRedirectEndpoint + "?state=" + process.env.REACT_APP_STATE;
        }
      return (
          <>
              <Navbar bg="dark" variant="dark">
                  <Container>
                      <NavbarBrand href="#home">Yet another wishlist maker v.0.1</NavbarBrand>
                      <NavbarToggle />
                      <NavbarCollapse className="justify-content-end">
                          <Nav>
                            {this.state.userLoggedIn ?
                              //   TODO: @devalv показывать Anonymous если не залогинен. При наведении показывать login с ссылкой
                              //   TODO: @devalv аналогично для того кто уже вошел
                            <NavItem onClick={this.logout}><Navbar.Text>{this.state.userName} you are now logged in</Navbar.Text></NavItem>:
                            <NavItem onClick={googleLogin}><Navbar.Text>Login with Google</Navbar.Text></NavItem>
                            }
                          </Nav>
                      </NavbarCollapse>
                </Container>
              </Navbar>

          </>
      );
  }
}


// function Login(props) {
//   const googleLogin = () => {
//     window.location.href = props.producerLoginRedirectEndpoint + "?state=" + process.env.REACT_APP_STATE;
//   }
//
//   return (
//       <>
//           <NavbarToggle onClick={googleLogin}><Navbar.Text>Login with Google</Navbar.Text></NavbarToggle>
//       </>
//   );
// }

export default Auth;