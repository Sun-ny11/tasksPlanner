import { error } from "console";
import { todolistsAPI, todolistsType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppAllReducerType } from "./store";
import { RequestType, appActions } from "./appReducer";
import { handelNetworkError, handelServerAppError } from "../utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: "todolists",
   initialState: [] as TodolistsDomainType[],
   reducers: {
      changeFilter: (state, action: PayloadAction<{ todolistID: string; value: FilterValuesType }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].filter = action.payload.value;
      },
      removeTodolist: (state, action: PayloadAction<{ todolistID: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state.splice(index, 1);
      },
      addTodolist: (state, action: PayloadAction<{ todo: todolistsType }>) => {
         state.unshift({ ...action.payload.todo, filter: "all", entityStatus: "idle" });
      },
      updateTodolist: (state, action: PayloadAction<{ todolistID: string; title: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].title = action.payload.title;
      },
      getTodolist: (state, action: PayloadAction<{ todolists: todolistsType[] }>) => {
         // return action.payload.todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }));

         action.payload.todolists.forEach((el) => {
            state.push({ ...el, filter: "all", entityStatus: "idle" });
         });
      },
      changeTodolistEntityStatus: (state, action: PayloadAction<{ status: RequestType; todolistID: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].entityStatus = action.payload.status;
      },
   },
});

export const todolistsReducer = slice.reducer;
export const todolistActions = slice.actions;

//types

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsDomainType = todolistsType & {
   filter: FilterValuesType;
   entityStatus: RequestType;
};

//action

//thunk

//Для того чтобы диспачить санку из санки:

// ThunkAction<void,AppRootStateType,unknown,AppAllReducerType> типизация

// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App

export const getTodolistTC = () => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .readTodolists()
         .then((res) => {
            if (res.statusText === "") {
               dispatch(todolistActions.getTodolist({ todolists: res.data }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const removeTodolistTC = (todolistID: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(todolistActions.changeTodolistEntityStatus({ status: "loading", todolistID }));
      todolistsAPI
         .deleteTodolists(todolistID)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(todolistActions.removeTodolist({ todolistID }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .createTodolists(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(todolistActions.addTodolist({ todo: res.data.data.item }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const updateTodolistTC = (todolistID: string, title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .updateTodolists(title, todolistID)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(todolistActions.updateTodolist({ todolistID, title }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
