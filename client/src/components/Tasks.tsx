import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";
import "./Tasks.css";

type task = {
  name: string;
  date: string;
  description: string;
  ID: number;
};
interface Props {
  tasks: task[];
  delete: Function;
}

const Tasks: React.FC<Props> = (props) => {
  return (
    <div className="tasks">
      {props.tasks.map((task) => (
        <Task
          name={task.name}
          date={task.date}
          description={task.description}
          ID={task.ID}
          delete={props.delete}
        />
      ))}
    </div>
  );
};

export default Tasks;
