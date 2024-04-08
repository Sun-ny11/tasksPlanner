import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import { v1 } from "uuid";
import { AppRootStateType } from "./store";
import { appReducer } from "./appReducer";
import { thunk } from "redux-thunk";
import { TaskPriorities, TaskStatus } from "common/enums/enums";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
});

const initialGlobalState = {
   todolists: [
      { id: "todolistId1", title: "What to learn", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
      { id: "todolistId2", title: "What to buy", addedDate: "", order: 0, filter: "all", entityStatus: "loading" },
   ],
   tasks: {
      ["todolistId1"]: [
         {
            id: v1(),
            title: "HTML&CSS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.Completed,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: v1(),
            title: "JS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
      ["todolistId2"]: [
         {
            id: v1(),
            title: "Milk",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: v1(),
            title: "React Book",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.Completed,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
   },
   app: {
      status: "idle",
      error: null,
   },
};

export const storyBookStore = legacy_createStore(
   rootReducer,
   initialGlobalState as AppRootStateType & undefined,
   applyMiddleware(thunk),
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
