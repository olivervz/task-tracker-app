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
    description: string;
    id: number;
  };
  const [addTask, setAddTask] = useState(false);
  const [tasksState, setTasksState] = useState<task[]>([]);

  useEffect(() => {
    const url = "http://localhost:3001/api/get";
    Axios.get(url).then((response) => {
      setTasksState(response.data);
    });
  }, [tasksState]);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const data = await response.json();
    return data;
  };

  const setTasks = async (data: any) => {
    const tasks: task[] = [];
    for (var i = 0; i < Object.keys(data.tasks).length; ++i) {
      tasks.push(data.tasks[i]);
    }
    setTasksState(tasks);
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
      <Tasks tasks={tasksState} delete={taskDelete} />
    </div>
  );
};

export default Main;
