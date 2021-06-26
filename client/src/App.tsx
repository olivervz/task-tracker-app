import React from "react";
import Axios from "axios";
import Main from "./components/sections/Main";
import Login from "./components/sections/Login";
import { useState } from "react";

function App() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);
  // const APIurl = "https://task-list-tracker.herokuapp.com";
  const APIurl = "http://localhost:3001";

  const checkUsernameAvailible = (username: string) => {
    const url = APIurl + "/api/username-available";
    Axios.get(url, { params: { username: username } }).then((response) => {
      alert(response);
    });
    return true;
  };
  const checkLoginInformation = (username: string, password: string) => {
    // validate information ...
    setLoggedInState(true);
  };
  const addUser = (username: string, password: string) => {
    // add user information...
    setLoggedInState(true);
  };
  const loginUser = (username: string, password: string) => {};

  return loggedInState ? (
    <Main />
  ) : (
    <Login
      checkUsernameAvailable={(username: string) =>
        checkUsernameAvailible(username)
      }
      checkLoginInformation={(username: string, password: string) =>
        checkLoginInformation(username, password)
      }
      addUser={(username: string, password: string) =>
        addUser(username, password)
      }
      loginUser={(username: string, password: string) =>
        loginUser(username, password)
      }
    />
  );
}

export default App;
