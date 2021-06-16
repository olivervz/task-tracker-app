import React from "react";

interface Props {
  taskName: string;
  taskDate: string;
  taskDescription: string;
}

const Task: React.FC<Props> = (props) => {
  return (
    <div style={{ width: 200, height: 200, backgroundColor: "blue" }}>
      <h1 className="title">{props.taskName}</h1>
      <h2 className="date">{props.taskDate}</h2>
      <h3 className="description">{props.taskDescription}</h3>
    </div>
  );
};

export default Task;
