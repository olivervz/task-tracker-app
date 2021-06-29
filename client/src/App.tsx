import React from "react";
import Axios from "axios";
import Main from "./components/sections/Main";
import Login from "./components/sections/Login";
import { useState } from "react";

function App() {
    const [loggedInState, setLoggedInState] = useState(false);
    const [userState, setUserState] = useState({
        username: "",
        password: "",
        id: -1,
    });
    const APIurl = "https://task-list-tracker.herokuapp.com";
    // const APIurl = "http://localhost:3001";

    const checkUsernameAvailible = async (username: string) => {
        const url = APIurl + "/api/username-available";
        const response = await Axios.get(url, {
            params: { username: username },
        });
        return response.data.usernameAvailable;
    };
    const checkLoginInformation = async (
        username: string,
        password: string
    ) => {
        const url = APIurl + "/api/get-user";
        const response = await Axios.get(url, {
            params: { username: username, password: password },
        });
        if (response.data.userExists) {
            setUserState({
                username: username,
                password: password,
                id: response.data.id,
            });
            setLoggedInState(true);
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
        setUserState({
            username: username,
            password: password,
            id: response.data.id,
        });
        setLoggedInState(true);
    };

    return loggedInState ? (
        <Main user={userState} />
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
        />
    );
}

export default App;
