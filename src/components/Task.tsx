import React from "react";
import "./Task.css";

interface Props {
  name: string;
  date: string;
  description: string;
  ID: number;
  delete: Function;
}

const Task: React.FC<Props> = (props) => {
  return (
    <div className="task">
      <div className="task-title font">{props.name}</div>
      <div className="task-date font">{props.date}</div>
      <button
        className="task-delete font"
        onClick={() => {
          props.delete(props.ID);
        }}
      >
        X
      </button>
    </div>
  );
};

export default Task;
