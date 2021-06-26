import React from "react";
import Axios from "axios";
import Main from "./components/sections/Main";
import Login from "./components/sections/Login";
import { useState } from "react";

function App() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);
  const [userState, setUserState] = useState(0);
  // const APIurl = "https://task-list-tracker.herokuapp.com";
  const APIurl = "http://localhost:3001";

  const checkUsernameAvailible = async (username: string) => {
    const url = APIurl + "/api/username-available";
    const response = await Axios.get(url, { params: { username: username } });
    return response.data.usernameAvailable;
  };
  const checkLoginInformation = async (username: string, password: string) => {
    const url = APIurl + "/api/get-user";
    const response = await Axios.get(url, {
      params: { username: username, password: password },
    });
    if (response.data.userExists) {
      setLoggedInState(true);
      setUserState(response.data.userId);
      return true;
    }
    return false;
  };
  const addUser = async (username: string, password: string) => {
    const url = APIurl + "/api/add-user";
    const response = await Axios.post(url, {
      username: username,
      password: password,
    });
    setUserState(response.data.userId);
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
