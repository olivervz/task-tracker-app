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
    console.log(value);
    Axios.put("http://localhost:3001/api/update", {
      field: field,
      value: value,
      id: props.id,
    });
    props.updateFieldCallback();
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
      <div className="task-title font" onClick={updateName}>
        {props.name}
      </div>
      <div className="task-date font" onClick={updateDate}>
        {props.datestring}
      </div>
      <button
        className="task-delete font"
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
      <div className="task-title font" onClick={updateName}>
        {props.name}
      </div>
      <div className="task-date font" onClick={updateDate}>
        {props.datestring}
      </div>
      <button
        className="task-delete font"
        onClick={() => {
          props.delete(props.id);
        }}
      >
        X
      </button>
      <p className="task-description font" onClick={updateDescription}>
        {props.description}
      </p>
    </div>
  );
};

export default Task;
