import React, { Component } from 'react';


class App extends Component {
// TODO: @devalv read env
  state = {
    producerLoginRedirectEndpoint: 'http://localhost:8000/v1/react_login/',
    producerLoginEndpoint: 'http://localhost:8000/v1/react_swap_token/',
    producerLogoutEndpoint: 'http://localhost:8000/v1/logout/',
    producerLoginCheckEndpoint: 'http://localhost:8000/v1/user/info/',
    userLoggedIn: false,
    userName: null,
  };

  componentDidMount() {
    this.authenticate()
  };

  setCookie = (cname, cvalue, exdays) => {
    console.log('setting cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log('cookie was set');
  };

  getCookie = (cname) => {
    console.log('getting cookie');
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
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
    };

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

  getAccessToken = (accessToken) => {
    const request = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      credentials: 'include'
    }

    fetch(this.state.producerLoginEndpoint, request)
    .then(response => {
      // Check user is logged in
      this.checkUserSessionStatus()
    })
    .then(data => {})
    .catch(err => {})
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
        if(!response.ok) throw new Error(response.status);
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
        if(!response.ok) throw new Error(response.status);
        else {this.setCookie('access_token', null); window.location.reload();}
      })
    .catch(err => {})
  }

  render() {
    return (
      <section id="page-container">
        {this.state.userLoggedIn ?
          <div>
            <div>
              {this.state.userName} you are now logged in!
            </div>
            <div>
              <button onClick={this.logout}>Logout</button>
            </div>
          </div> :
          <Login producerLoginRedirectEndpoint={this.state.producerLoginRedirectEndpoint}/>
        }
      </section>
    );
  }
}


function Login(props) {
  const googleLogin = () => {
      // TODO: @devalv read state from env
    var auth_state = "react-random-str"
    var login_url = props.producerLoginRedirectEndpoint + "?state=" + auth_state
    window.location.href = login_url
  }

  return (
    <section>
      <div>
        <button onClick={googleLogin}>Login with Google</button>
      </div>
    </section>
  );
}

export default App;