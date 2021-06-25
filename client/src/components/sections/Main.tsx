import React from "react";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
import Axios from "axios";
import "./Main.css";
import { useState, useEffect } from "react";

const Main = () => {
  type task = {
    name: string;
    date: string;
    datestring: string;
    description: string;
    id: number;
  };
  const [addTask, setAddTask] = useState(false);
  const [tasksState, setTasksState] = useState<task[]>([]);
  // const APIurl = "https://task-list-tracker.herokuapp.com";
  const APIurl = "http://localhost:3001";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const url = APIurl + "/api/get";
    Axios.get(url).then((response) => {
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
        <button className="add-task font-title" onClick={() => handleAddTask()}>
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
