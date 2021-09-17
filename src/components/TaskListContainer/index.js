import React, { memo, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { GlobalContext } from "../../context/GlobalState";
import TaskCard from "../TaskCard";
import AddNewField from "../AddNewField";

const TaskListContainerDiv = styled.div`
  max-width: 300px;
  border: 2px solid black;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 0;

  .task-card {
    border: 2px solid black;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 10px 0;
  }

  .heading {
    margin: 0 5px;
    display: flex;
    justify-content: space-between;
  }

  .close-btn {
    cursor: pointer;
  }

  .add-task {
    position: sticky;
    bottom: 0;
    background: white;
    width: 100%;
    padding: 10px 0;
  }

  .add-task-btn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: white;
    font-size: 2em;
    border: 1px solid black;
  }
`;

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

const TaskListContainer = (props) => {
  const { title, taskList, createdAt } = props;

  const { deleteList, taskListing, updateList } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem("TRELLO_TASK_LIST", JSON.stringify(taskListing));
  }, [taskListing]);

  const parentList = {
    createdAt,
  };

  const [addTaskModalState, setAddTaskModalState] = useState(false);

  const toggleModalState = () => {
    setAddTaskModalState(!addTaskModalState);
  };

  const handleDeleteList = () => {
    const listObj = {
      createdAt,
    };
    deleteList(listObj);
  };

  const renderAddTaskModal = () => {
    const addNewFieldData = {
      type: "task",
      parentList,
      fields: [
        { name: "Title", key: "title" },
        { name: "Description", key: "desc" },
      ],
    };
    return (
      <Modal
        isOpen={addTaskModalState}
        onRequestClose={toggleModalState}
        style={customStyles}
      >
        <AddNewField onClose={toggleModalState} {...addNewFieldData} />
      </Modal>
    );
  };

  const onDragStart = (event, taskObj) => {
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
    taskObj = {
      ...taskObj,
      currentTaskParentListCreationTime: parentList.createdAt,
    };
    event.dataTransfer.clearData();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(taskObj));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
    event.dataTransfer.dropEffect = "move";

    return false;
  };

  const dragnDropTask = (payload) => {
    const taskListingCopy3 = [...taskListing];

    const targetParentListIndex = taskListing.findIndex(
      (obj) => obj.createdAt === payload.targetTaskParentListCreationTime
    );
    const sourceParentListIndex = taskListing.findIndex(
      (obj) => obj.createdAt === payload.currentTaskParentListCreationTime
    );

    taskListingCopy3[sourceParentListIndex].taskList = taskListingCopy3[
      sourceParentListIndex
    ].taskList.filter((taskObj) => taskObj.createdAt !== payload.createdAt);

    const getTaskObj = () => ({
      title: payload.title,
      desc: payload.desc,
      createdAt: payload.createdAt,
    });

    taskListingCopy3[targetParentListIndex].taskList.push(getTaskObj());

    taskListingCopy3[targetParentListIndex].taskList.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });

    return taskListingCopy3;
  };

  const onDrop = (event) => {
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
    event.dataTransfer.dropEffect = "move";
    let droppedTaskObj = JSON.parse(event.dataTransfer.getData("text/plain"));
    droppedTaskObj = {
      ...droppedTaskObj,
      targetTaskParentListCreationTime: parentList.createdAt,
    };
    if (
      droppedTaskObj.currentTaskParentListCreationTime === parentList.createdAt
    ) {
      return;
    }

    const result = dragnDropTask(droppedTaskObj);
    updateList(result);
    event.preventDefault();

    return false;
  };

  return (
    <TaskListContainerDiv
      className="droppable"
      onDragOver={(event) => onDragOver(event)}
      onDrop={(event) => onDrop(event, "wip")}
    >
      <div>
        <h1 className="heading">
          {title}
          <span className="close-btn" onClick={handleDeleteList}>
            X
          </span>
        </h1>
      </div>
      <div className="task-list">
        {taskList.length
          ? taskList.map((taskItem) => (
              <div
                key={taskItem.createdAt}
                draggable
                onDragStart={(e) => onDragStart(e, taskItem)}
                className="task-card draggable"
              >
                <TaskCard {...taskItem} parentList={parentList} />
              </div>
            ))
          : null}
      </div>
      <div className="add-task">
        <button onClick={toggleModalState} className="add-task-btn">
          +
        </button>
      </div>
      {addTaskModalState ? renderAddTaskModal() : null}
    </TaskListContainerDiv>
  );
};

export default memo(TaskListContainer);
