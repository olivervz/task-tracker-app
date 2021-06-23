import React from "react";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
import "./Main.css";
import { useState, useEffect } from "react";

const Main = () => {
  type task = {
    name: string;
    date: string;
    description: string;
    ID: number;
  };
  const [addTask, setAddTask] = useState(false);
  const [numTasks, setNumTasks] = useState(0);
  const [tasksState, setTasksState] = useState<task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    console.log("asdf");
    getTasks();
  }, [numTasks]);

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

  const taskSubmit = async (
    name: string,
    date: string,
    description: string
  ) => {
    setAddTask(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: {
          name: name,
          date: date,
          description: description,
        },
      }),
    };
    const response = await fetch(
      "http://localhost:4000/addtask",
      requestOptions
    );
    setNumTasks(numTasks + 1);
    console.log("add", numTasks);
  };

  const taskCancel = () => {
    setAddTask(false);
  };

  const taskDelete = async (taskID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "applications/json" },
    };
    const response = await fetch(
      "http://localhost:4000/" + taskID,
      requestOptions
    );
    setNumTasks(numTasks - 1);
    console.log("del", numTasks);
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
