import { InputGroup, Modal, FormControl, Button } from "react-bootstrap";
import React, {useState, useContext} from "react";
import axios from "axios";
import {tokenInfo, TokenContext} from "../auth-context";
import Cookies from "js-cookie";

const { REACT_APP_API_V2_URL } = process.env;
const userLoginEndpoint = `${REACT_APP_API_V2_URL}/token`;
const userCreateEndpoint = `${REACT_APP_API_V2_URL}/users/create`;


function UserLoginModal(props) {

    const [, setTokenState] = useContext(TokenContext);
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
        console.debug('login user');
        let bodyFormData = new FormData();
        bodyFormData.append('username', usernameValue);
        bodyFormData.append('password', passwordValue);
        e.preventDefault();
        try {
            await axios
            .post(userLoginEndpoint, bodyFormData)
            .then(function (response) {
                let data = response.data;
                console.debug("data:", data)
                console.debug(tokenInfo);
                // set token state
                setTokenState({access_token: data["access_token"], refresh_token: data["refresh_token"], token_type: data["token_type"]});
                props.onHide();
                // set auth cookie
                window.history.pushState("object", document.title, "/");
                Cookies.set("access_token", data["access_token"], { expires: 1, secure: true , sameSite: 'strict' });
                // reload page to get auth effect
                window.location.reload();

            });
        } catch (err) {
            console.error(err.message);
        }
    };

    const registerUser = async (e) => {
        let userData = {
            "username": usernameValue,
            "password": passwordValue
        }
        e.preventDefault();
        try {
            await axios
            .post(userCreateEndpoint, userData)
            .then(function (response) {
                console.info("User created. Now login.");
                loginUser(e);
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
                <Button onClick={registerUser}>Зарегистрироваться</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserLoginModal;
