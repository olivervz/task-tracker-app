import React from "react";
import { useState } from "react";
import "./Login.css";

interface Props {
  checkUsernameAvailable: Function;
  checkLoginInformation: Function;
  addUser: Function;
  loginUser: Function;
}

const Login: React.FC<Props> = (props) => {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const checkFields = () => {
    if (usernameState === "" && passwordState === "") {
      setUsernameError(true);
      setPasswordError(true);
      setErrorText("username & password invalid");
      return false;
    }
    if (usernameState === "") {
      setUsernameError(true);
      setErrorText("username invalid");
      return false;
    }
    if (passwordState === "") {
      setPasswordError(true);
      setErrorText("password invalid");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!checkFields()) {
      return;
    }
    const loginInformationCorrect = await props.checkLoginInformation(
      usernameState,
      passwordState
    );
    if (!loginInformationCorrect) {
      const usernameAvailable = await props.checkUsernameAvailable(
        usernameState
      );
      if (usernameAvailable) {
        setErrorText("no user with that username exists");
        setUsernameError(true);
      } else {
        setErrorText("incorrect password");
        setPasswordError(true);
      }
      return;
    }
  };
  const signUp = async () => {
    if (!checkFields()) {
      return;
    }
    const usernameAvailable = await props.checkUsernameAvailable(usernameState);
    if (!usernameAvailable) {
      setErrorText("username taken");
      setUsernameError(true);
      return;
    }
    props.addUser(usernameState, passwordState);
  };

  return (
    <div className="login-card">
      <h1 className="font-title-login">Login / Sign-up</h1>
      <input
        className="input-field"
        onChange={(e) => {
          setUsernameState(e.target.value);
          setUsernameError(false);
        }}
        placeholder="username"
        style={{
          border: usernameError ? "1px solid red" : "1px solid rgb(0, 0, 0, 0)",
        }}
      ></input>
      <input
        className="input-field"
        onChange={(e) => {
          setPasswordState(e.target.value);
          setPasswordError(false);
        }}
        placeholder="password"
        style={{
          border: passwordError ? "1px solid red" : "1px solid rgb(0, 0, 0, 0)",
        }}
      ></input>
      <div className="login-card-footer">
        <button className="login font-button" onClick={() => login()}>
          login
        </button>
        <button className="sign-up font-button" onClick={() => signUp()}>
          sign-up
        </button>
      </div>
      <div className="error-text font-error">{errorText}</div>
    </div>
  );
};

export default Login;
