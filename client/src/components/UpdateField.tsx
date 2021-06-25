import React from "react";
import { useState } from "react";
import "./UpdateField.css";

interface Props {
  fieldValue: string;
  update: Function;
  cancel: Function;
}

const UpdateField: React.FC<Props> = (props) => {
  const [field, setField] = useState("");

  const handleFieldChange = (value: string) => {
    setField(value);
  };
  return (
    <div
      className="update-field-form"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        className="update-field-input font"
        placeholder={props.fieldValue}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          handleFieldChange(e.target.value);
        }}
      />
      <div className="add-task-form-footer">
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.update(field);
          }}
          className="submit-button font"
        >
          update
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
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

export default UpdateField;
