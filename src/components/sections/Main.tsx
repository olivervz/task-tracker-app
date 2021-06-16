import React from "react";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
import "./Main.css";
import { useState, useEffect } from "react";

const Main = () => {
  const [addTask, setAddTask] = useState(false);

  const handleAddTask = () => {
    setAddTask(!addTask);
  };

  const taskSubmit = () => {
    setAddTask(false);
  };

  const taskCancel = () => {
    setAddTask(false);
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
      <Tasks />
    </div>
  );
};

export default Main;
