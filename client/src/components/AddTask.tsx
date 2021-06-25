import React from "react";
import { useState } from "react";
import "./AddTask.css";

interface Props {
  submit: Function;
  cancel: Function;
}

const AddTask: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [dateError, setDateError] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const submit = (
    taskName: string,
    taskDate: string,
    taskDescription: string
  ) => {
    // Check if date is valid
    var dateArr = taskDate.split("-");
    var date = new Date(
      parseInt(dateArr[2]),
      parseInt(dateArr[0]) - 1,
      parseInt(dateArr[1])
    );
    if (date instanceof Date && !isNaN(date.getTime())) {
      if (taskName !== "" && taskDate !== "") {
        props.submit(taskName, taskDate, taskDescription);
      }
    } else {
      setDateError(true);
      return;
    }
  };
  return (
    <div className="add-task-form">
      <input
        className="task-name-input font"
        placeholder="Add task..."
        onChange={(e) => handleNameChange(e)}
      />
      <input
        className="task-name-input font"
        placeholder="Task Date (MM-DD-YYYY)..."
        style={{ color: dateError ? "red" : "white" }}
        onChange={(e) => handleDateChange(e)}
      />
      <input
        className="task-name-input font"
        placeholder="Task Description..."
        onChange={(e) => handleDescriptionChange(e)}
      />
      <div className="add-task-form-footer">
        <button
          onClick={() => {
            submit(name, date, description);
          }}
          className="submit-button font"
        >
          submit
        </button>
        <button
          onClick={() => {
            props.cancel();
          }}
          className="cancel-button font"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
