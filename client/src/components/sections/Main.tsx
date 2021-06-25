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

  useEffect(() => {
    fetchTasks();
  }, [tasksState]);

  const fetchTasks = () => {
    const url = "http://localhost:3001/api/get";
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
    const url = "http://localhost:3001/api/insert";
    Axios.post(url, {
      name: name,
      date: date,
      description: description,
    });
    setAddTask(false);
  };

  const taskCancel = () => {
    setAddTask(false);
  };

  const taskDelete = async (taskID: number) => {
    const url = `http://localhost:3001/api/delete/${taskID}`;
    Axios.delete(url);
  };

  return (
    <div>
      <div className="heading font">
        <div className="title">Task Tracker </div>
        <button className="add-task font" onClick={() => handleAddTask()}>
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
