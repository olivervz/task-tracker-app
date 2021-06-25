import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";
import "./Tasks.css";

type task = {
  name: string;
  date: string;
  datestring: string;
  description: string;
  id: number;
};
interface Props {
  tasks: task[];
  delete: Function;
  updateFieldCallback: Function;
}

const Tasks: React.FC<Props> = (props) => {
  return (
    <div className="tasks">
      {props.tasks.map((task) => (
        <Task
          name={task.name}
          date={task.date}
          datestring={task.datestring}
          description={task.description}
          id={task.id}
          delete={props.delete}
          updateFieldCallback={props.updateFieldCallback}
        />
      ))}
    </div>
  );
};

export default Tasks;
