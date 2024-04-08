import { todolistsAPI, todolistsType } from "../api/todolists-api";
import { RequestType, appActions } from "./appReducer";
import { handelNetworkError } from "../utils/error-utils";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { handelServerAppError } from "utils/handelServerAppError";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";

const slice = createSlice({
   name: "todolists",
   initialState: [] as TodolistsDomainType[],
   reducers: {
      changeFilter: (state, action: PayloadAction<{ todolistID: string; value: FilterValuesType }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].filter = action.payload.value;
      },

      addTodolist: (state, action: PayloadAction<{ todo: todolistsType }>) => {
         state.unshift({ ...action.payload.todo, filter: "all", entityStatus: "idle" });
      },
      updateTodolist: (state, action: PayloadAction<{ todolistID: string; title: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].title = action.payload.title;
      },
      changeTodolistEntityStatus: (state, action: PayloadAction<{ status: RequestType; todolistID: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].entityStatus = action.payload.status;
      },
      clearData: () => {
         return [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getTodolist.fulfilled, (state, action) => {
            action.payload.todolists.forEach((el) => {
               state.push({ ...el, filter: "all", entityStatus: "idle" });
            });
         })
         .addCase(removeTodolist.fulfilled, (state, action) => {
            debugger;
            const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
            if (index !== -1) state.splice(index, 1);
         });
   },
});

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

const getTodolist = createAppAsyncThunk<{ todolists: todolistsType[] }, void>(
   `${slice.name}/getTodolist`,
   async (_, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(appActions.setAppStatus({ status: "loading" }));
      try {
         const res = await todolistsAPI.readTodolists();
         if (res.statusText === "") {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { todolists: res.data };
         } else {
            return rejectWithValue(null);
         }
      } catch (error: any) {
         handelNetworkError(error, dispatch);
         return rejectWithValue(null);
      }
   },
);

const removeTodolist = createAppAsyncThunk<{ todolistID: string }, string>(
   `${slice.name}/removeTodolist`,
   async (todolistID, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(todolistActions.changeTodolistEntityStatus({ status: "loading", todolistID }));
      try {
         const res = await todolistsAPI.deleteTodolists(todolistID);
         if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { todolistID };
         } else {
            handelServerAppError(res.data, dispatch);
            return rejectWithValue(null);
         }
      } catch (error: any) {
         handelNetworkError(error, dispatch);
         return rejectWithValue(null);
      }
   },
);

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

export const todolistsReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { getTodolist, removeTodolist };
