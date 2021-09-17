import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import TaskListingContainer from "../TaskListingContainer";
import AddNewField from "../AddNewField";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const AddListBtn = styled.div`
  text-align: right;

  .add-list-btn {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    font-size: 1.5em;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const DashboardContainer = styled.div`
  margin: 0 2em;
`;

const Dashboard = () => {
  const [addListModalState, setAddListModalState] = useState(false);

  const toggleModalState = () => {
    setAddListModalState(!addListModalState);
  };

  const renderAddListButton = () => (
    <AddListBtn>
      <button type="button" className="add-list-btn" onClick={toggleModalState}>
        Add List
      </button>
    </AddListBtn>
  );

  const renderAddListModal = () => {
    const addNewFieldData = {
      type: "list",
      fields: [{ name: "Title", key: "title" }],
    };
    return (
      <Modal
        isOpen={addListModalState}
        onRequestClose={toggleModalState}
        style={customStyles}
      >
        <AddNewField onClose={toggleModalState} {...addNewFieldData} />
      </Modal>
    );
  };

  return (
    <DashboardContainer>
      {renderAddListButton()}
      <TaskListingContainer />
      {addListModalState ? renderAddListModal() : null}
    </DashboardContainer>
  );
};

export default Dashboard;
