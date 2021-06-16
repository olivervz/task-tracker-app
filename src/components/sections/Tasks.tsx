import React from "react";
import Task from "../Task";
import AddTask from "../AddTask";
import { useState, useEffect } from "react";

const Tasks = () => {
  const [addTask, setAddTask] = useState(false);

  const handleAddTask = () => {
    setAddTask(!addTask);
  };

  return (
    <div>
      <button onClick={() => handleAddTask()}>{addTask ? "x" : "add"}</button>
      {addTask ? <AddTask /> : ""}
      <div>
        <Task
          taskName="Test task 1"
          taskDate="August 5th, 4:30 PM"
          taskDescription="Description text"
        ></Task>
        <Task
          taskName="Test task 2"
          taskDate="August 7th"
          taskDescription="asdfasdfasdfasdf"
        ></Task>
      </div>
    </div>
  );
};

export default Tasks;
