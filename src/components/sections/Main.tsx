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
  const [tasks, setTasks] = useState<task[]>([]);
  const [ID, setID] = useState(0);

  const handleAddTask = () => {
    setAddTask(!addTask);
  };

  const taskSubmit = (name: string, date: string, description: string) => {
    const task = {
      name: name,
      date: date,
      description: description,
      ID: ID,
    };
    setTasks([...tasks, task]);
    setID(ID + 1);
    setAddTask(false);
  };

  const taskCancel = () => {
    setAddTask(false);
  };

  const taskDelete = (taskID: number) => {
    setTasks(tasks.filter((task) => task.ID != taskID));
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
      <Tasks tasks={tasks} delete={taskDelete} />
    </div>
  );
};

export default Main;
