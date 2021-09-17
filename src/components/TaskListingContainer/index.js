import React, { useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";
import TaskListContainer from "../TaskListContainer";

const TaskListingContainerDiv = styled.div`
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: auto auto auto auto;
  padding: 0.5em;
`;

const TaskListingContainer = () => {
  const { taskListing } = useContext(GlobalContext);

  useLayoutEffect(() => {
    localStorage.setItem("TRELLO_TASK_LIST", JSON.stringify(taskListing));
  }, [taskListing]);

  return (
    <TaskListingContainerDiv>
      {taskListing.length
        ? taskListing.map((item) => (
            <TaskListContainer key={item.createdAt} {...item} />
          ))
        : null}
    </TaskListingContainerDiv>
  );
};

export default TaskListingContainer;
