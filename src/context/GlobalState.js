import React, { createContext, useReducer } from "react";

import appReducer from "./AppReducer";

const initialState = {
  taskListing: JSON.parse(localStorage.getItem("TRELLO_TASK_LIST")) || [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addList = (list) => {
    dispatch({
      type: "ADD_LIST",
      payload: list,
    });
  };

  const deleteList = (list) => {
    dispatch({
      type: "DELETE_LIST",
      payload: list,
    });
  };

  const addTask = (task) => {
    dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  };

  const deleteTask = (task) => {
    dispatch({
      type: "DELETE_TASK",
      payload: task,
    });
  };

  const updateList = (list) => {
    dispatch({
      type: "UPDATE_LIST",
      payload: list,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        taskListing: state.taskListing,
        addList,
        deleteList,
        addTask,
        deleteTask,
        updateList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
