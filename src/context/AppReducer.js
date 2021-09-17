const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        taskListing: [action.payload, ...state.taskListing],
      };

    case "UPDATE_LIST":
      return {
        ...state,
        taskListing: [...action.payload],
      };

    case "DELETE_LIST":
      const updatedTaskListing = state.taskListing.filter(
        (taskObj) => taskObj.createdAt !== action.payload.createdAt
      );

      return {
        ...state,
        taskListing: updatedTaskListing,
      };

    case "ADD_TASK":
      const taskListingCopy = [...state.taskListing];
      const currentListIndex = state.taskListing.findIndex(
        (listItem) => listItem.createdAt === action.payload.parentList.createdAt
      );

      const taskObj = {
        title: action.payload.title,
        desc: action.payload.desc,
        createdAt: action.payload.createdAt,
      };

      taskListingCopy[currentListIndex] = {
        ...taskListingCopy[currentListIndex],
        taskList: [taskObj, ...taskListingCopy[currentListIndex].taskList],
      };

      return {
        ...state,
        taskListing: [...taskListingCopy],
      };

    case "DELETE_TASK":
      const taskListingCopy1 = [...state.taskListing];
      const currentListIndex2 = state.taskListing.findIndex(
        (listItem) => listItem.createdAt === action.payload.parentList.createdAt
      );

      taskListingCopy1[currentListIndex2] = {
        ...taskListingCopy1[currentListIndex2],
        taskList: taskListingCopy1[currentListIndex2].taskList.filter(
          (taskItem) => taskItem.createdAt !== action.payload.createdAt
        ),
      };

      taskListingCopy1[currentListIndex2].taskList.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });

      return {
        ...state,
        taskListing: [...taskListingCopy1],
      };

    default:
      return state;
  }
};

export default appReducer;
