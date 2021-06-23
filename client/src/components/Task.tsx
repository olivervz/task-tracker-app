import React from "react";
import "./Task.css";
import { useState } from "react";

interface Props {
  name: string;
  date: string;
  description: string;
  ID: number;
  delete: Function;
}

const Task: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return !expanded ? (
    <div className="task" onClick={() => toggleExpand()}>
      <div className="task-title font">{props.name}</div>
      <div className="task-date font">{props.date}</div>
      <button
        className="task-delete font"
        onClick={(e) => {
          e.stopPropagation();
          props.delete(props.ID);
        }}
      >
        X
      </button>
    </div>
  ) : (
    <div className="task-expanded" onClick={() => toggleExpand()}>
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
      <p className="task-description font">{props.description}</p>
    </div>
  );
};

export default Task;
