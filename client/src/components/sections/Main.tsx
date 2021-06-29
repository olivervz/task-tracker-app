import React from "react";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
import Axios from "axios";
import "./Main.css";
import { useState, useEffect } from "react";

interface User {
    username: String;
    password: String;
    id: Number;
}
interface Props {
    user: User;
}

const Main: React.FC<Props> = (props) => {
    type task = {
        name: string;
        date: string;
        datestring: string;
        description: string;
        id: number;
    };
    const [addTask, setAddTask] = useState(false);
    const [tasksState, setTasksState] = useState<task[]>([]);
    const APIurl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://task-list-tracker.herokuapp.com";

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        const url = APIurl + "/api/get";
        Axios.get(url, { params: { id: props.user.id } }).then((response) => {
            setTasksState(response.data);
        });
    };

    const updateFieldCallback = () => {
        fetchTasks();
    };

    const handleAddTask = () => {
        setAddTask(!addTask);
    };

    const taskSubmit = (name: string, date: string, description: string) => {
        const url = APIurl + "/api/insert";
        Axios.post(url, {
            name: name,
            date: date,
            description: description,
            id: props.user.id,
        }).then((result) => {
            setAddTask(false);
            fetchTasks();
        });
    };

    const taskCancel = () => {
        setAddTask(false);
    };

    const taskDelete = async (taskID: number) => {
        const url = APIurl + `/api/delete/${taskID}`;
        Axios.delete(url).then((result) => {
            fetchTasks();
        });
    };

    return (
        <div>
            <div className="heading">
                <div className="title font-title">Task Tracker </div>
                <button
                    className="add-task font-add-task"
                    onClick={() => handleAddTask()}
                >
                    Add Task
                </button>
            </div>
            {addTask ? (
                <>
                    <div className="page-mask"></div>
                    <AddTask submit={taskSubmit} cancel={taskCancel} />
                </>
            ) : (
                ""
            )}
            <Tasks
                tasks={tasksState}
                delete={taskDelete}
                updateFieldCallback={updateFieldCallback}
            />
        </div>
    );
};

export default Main;
