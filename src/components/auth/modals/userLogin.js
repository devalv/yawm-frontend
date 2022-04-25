import { InputGroup, Modal, FormControl, Button } from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

const { REACT_APP_API_V2_URL } = process.env;

function UserLoginModal(props) {

  const userLoginEndpoint = `${REACT_APP_API_V2_URL}/token`;
//   const userCreateEndpoint = `${REACT_APP_API_V2_URL}/users/create`;
  
  const [usernameValue, setUsernameValue] = useState();
  const [passwordValue, setPasswordValue] = useState();

  const handleUsernameChange = (e) => {
    if (e.target.value) {
        setUsernameValue(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value) {
        setPasswordValue(e.target.value);
    }
  };

    const loginUser = async (e) => {
        console.debug(userLoginEndpoint)
        var bodyFormData = new FormData();
        bodyFormData.append('username', usernameValue);
        bodyFormData.append('password', passwordValue);

        e.preventDefault();
        try {
      await axios
      
        .post(userLoginEndpoint, bodyFormData)
        // .post(userLoginEndpoint, bodyFormData, {headers: { "Content-Type": "multipart/form-data" }})
        .then(function (response) {
          console.debug(response.data)
          props.onHide();
        //   TODO: @devalv set password token
        //   window.location.reload();
        });
    } catch (err) {
      console.error(err.message);
    }
    };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeLabel="Закрыть">
        <Modal.Title id="contained-modal-title-vcenter">
          Вход
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            Имя пользователя
          </InputGroup.Text>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="username"
            onChange={(e) => handleUsernameChange(e)}
          />
          <InputGroup.Text id="inputGroup-sizing-sm">
            Пароль
          </InputGroup.Text>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="password"
            onChange={(e) => handlePasswordChange(e)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={loginUser}>Войти</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserLoginModal;
