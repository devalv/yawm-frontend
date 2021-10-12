import React, { Component } from 'react';
import {Card, Button} from "react-bootstrap";


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
    console.log('setting cookie');
    let current_d = new Date();
    current_d.setTime(current_d.getTime() + (ex_days*24*60*60*1000));

    let expires = "expires="+ current_d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
    console.log('cookie was set');
  };

  getCookie = (c_name) => {
    console.log('getting cookie');
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
    console.log('authenticate called');
    let accessToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1];

    if (!accessToken) {
        console.log('there is no access token on location');
        accessToken = this.getCookie('access_token');
        console.log('token from cookie:', accessToken);
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
    console.log('access token:', accessToken);
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
      return (
          <>
              {this.state.userLoggedIn ?
                  <Card>
                      <Card.Body>
                          <h2 className="text-center mb-4">{this.state.userName} you are now logged in!</h2>
                          <Button className="w-100" onClick={this.logout}>Logout</Button>
                      </Card.Body>
                  </Card> :
                  <Login producerLoginRedirectEndpoint={this.state.producerLoginRedirectEndpoint}/>
              }

          </>
      );
  }
}


function Login(props) {
  const googleLogin = () => {
    window.location.href = props.producerLoginRedirectEndpoint + "?state=" + process.env.REACT_APP_STATE;
  }

  return (
      <>
          <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">Sign Up</h2>
                  <Button className="w-100" onClick={googleLogin}>Login with Google</Button>
              </Card.Body>
          </Card>
          <div className="w-100 text-center  mt-2">
            Already have an account? Log In
        </div>
      </>
  );
}

export default Auth;