import React from "react";
import "./Task.css";
import { useState } from "react";
import Axios from "axios";
import UpdateField from "./UpdateField";

interface Props {
  name: string;
  date: string;
  datestring: string;
  description: string;
  id: number;
  delete: Function;
  updateFieldCallback: Function;
}

const Task: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [displayUpdateField, setDisplayUpdateField] = useState(false);
  const [field, setField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  // const APIurl = "https://task-list-tracker.herokuapp.com";
  const APIurl = "http://localhost:3001";
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const updateName = () => {
    setDisplayUpdateField(true);
    setField("name");
    setFieldValue(props.name);
  };
  const updateDate = () => {
    setDisplayUpdateField(true);
    setField("datestring");
    setFieldValue(props.datestring);
  };
  const updateDescription = () => {
    setDisplayUpdateField(true);
    setField("description");
    setFieldValue(props.description);
  };

  const cancelUpdate = () => {
    setDisplayUpdateField(false);
  };

  const submitUpdate = (value: string) => {
    setDisplayUpdateField(false);
    const url = APIurl + "/api/update";
    Axios.put(url, {
      field: field,
      value: value,
      id: props.id,
    }).then((result) => {
      props.updateFieldCallback();
    });
  };

  const pastDue = () => {
    var today: Date = new Date();
    var date: Date = new Date(props.date);
    return today > date;
  };
  const isToday = () => {
    var today: Date = new Date();
    var date: Date = new Date(props.date);
    if (
      today.getMonth() === date.getMonth() &&
      today.getDay() === date.getDay() &&
      today.getFullYear() === date.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateFieldPopup = (
    <>
      {displayUpdateField ? (
        <>
          <div className="page-mask"></div>
          <UpdateField
            cancel={() => cancelUpdate()}
            update={(value: string) => submitUpdate(value)}
            fieldValue={fieldValue}
          />
        </>
      ) : (
        ""
      )}
    </>
  );

  return !expanded ? (
    <div className="task" onClick={() => toggleExpand()}>
      {updateFieldPopup}
      <div
        className="task-title font"
        onClick={(e) => {
          e.stopPropagation();
          updateName();
        }}
      >
        {props.name}
      </div>
      <div
        className="task-date font"
        onClick={(e) => {
          e.stopPropagation();
          updateDate();
        }}
        style={{
          color: isToday() ? "green" : pastDue() ? "red" : "white",
        }}
      >
        {props.datestring}
      </div>
      <button
        className="task-delete font-delete"
        onClick={(e) => {
          e.stopPropagation();
          props.delete(props.id);
        }}
      >
        X
      </button>
    </div>
  ) : (
    <div className="task-expanded" onClick={() => toggleExpand()}>
      {updateFieldPopup}
      <div
        className="task-title font"
        onClick={(e) => {
          e.stopPropagation();
          updateName();
        }}
      >
        {props.name}
      </div>
      <div
        className="task-date font"
        onClick={(e) => {
          e.stopPropagation();
          updateDate();
        }}
        style={{
          color: isToday() ? "green" : pastDue() ? "red" : "white",
        }}
      >
        {props.datestring}
      </div>
      <button
        className="task-delete font-delete"
        onClick={(e) => {
          e.stopPropagation();
          props.delete(props.id);
        }}
      >
        X
      </button>
      <div
        className="task-description"
        onClick={(e) => {
          e.stopPropagation();
          updateDescription();
        }}
      >
        <p className="task-description-text font">{props.description}</p>
      </div>
    </div>
  );
};

export default Task;
