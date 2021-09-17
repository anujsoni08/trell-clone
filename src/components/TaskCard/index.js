import React, { useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

const TaskCardContainer = styled.div`
  border-radius: 15px;
  font-size: 12px;
  color: black;

  .heading {
    margin: 0 5px;
    display: flex;
    justify-content: space-between;
  }

  .close-btn {
    cursor: pointer;
  }
`;

const TaskCard = (props) => {
  const { title, desc, createdAt, parentList } = props;
  const { deleteTask,taskListing } = useContext(GlobalContext);

  useLayoutEffect(() => {
    localStorage.setItem("TRELLO_TASK_LIST", JSON.stringify(taskListing));
  }, [taskListing]);

  const handleDeleteTask = () => {
    const taskObj = {
      createdAt,
      parentList,
    };
    deleteTask(taskObj);
  };

  return (
    <TaskCardContainer>
      <h1 className="heading">
        {title}
        <span className="close-btn" onClick={handleDeleteTask}>
          X
        </span>
      </h1>
      <h1 className="heading">{desc}</h1>
    </TaskCardContainer>
  );
};

export default TaskCard;
