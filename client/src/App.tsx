import React from "react";
import Main from "./components/sections/Main";
import Login from "./components/sections/Login";
import { useState } from "react";

function App() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);

  const checkUsernameAvailible = (username: string) => {
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
