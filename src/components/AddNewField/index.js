import React, { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

const AddNewFieldContainer = styled.div`
  .modal-header {
    display: flex;
    -webkit-box-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 1rem;
    padding-left: 0;
    padding-top: 0;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
    margin-top: 1em;
  }

  .close {
    cursor: pointer;
    padding: 1rem;
    padding-right: 0;
    margin: -1rem -1rem -1rem auto;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .label-text {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .input-text {
    display: block;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .submit-btn-div {
    text-align: center;
  }

  .submit-btn {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

const AddNewField = (props) => {
  const { addList, addTask, taskListing } = useContext(GlobalContext);

  const { fields, onClose, type, parentList } = props;

  const formValuesObj = {};

  fields.forEach((item) => {
    formValuesObj[item.key] = "";
  });

  useLayoutEffect(() => {
    localStorage.setItem("TRELLO_TASK_LIST", JSON.stringify(taskListing));
  }, [taskListing]);

  const [formValues, setFormValues] = useState(formValuesObj);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    let listObj = {
      createdAt: currentDate.getTime(),
    };
    for (let key in formValues) {
      listObj[key] = formValues[key];
    }
    if (type === "list") {
      listObj = {
        ...listObj,
        taskList: [],
      };
      addList(listObj);
    } else {
      listObj = {
        ...listObj,
        parentList,
      };
      addTask(listObj);
    }
    onClose();
  };

  const isSubmitDisabled = () => {
    for (let value in formValues) {
      if (!formValues[value]) {
        return true;
      }
    }
    return false;
  };

  return (
    <AddNewFieldContainer>
      <div className="modal-header">
        <h2 className="modal-title">Add {type}</h2>
        <button
          type="button"
          onClick={onClose}
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {fields.map((formFieldData) => (
        <div className="form-group" key={formFieldData.key}>
          <label className="label-text" htmlFor={formFieldData.key}>
            {formFieldData.name}:
          </label>
          <input
            type="text"
            className="input-text"
            placeholder={"Enter " + formFieldData.name}
            onChange={handleChange}
            id={formFieldData.key}
            name={formFieldData.key}
            value={formValues[formFieldData.key]}
          />
        </div>
      ))}
      <div className="submit-btn-div">
        <button
          className="submit-btn"
          disabled={isSubmitDisabled()}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </AddNewFieldContainer>
  );
};

export default AddNewField;
