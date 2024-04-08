import { Dispatch, PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { taskTodoType } from "../Components/app/App";
import { TaskType, modelType, todolistsAPI } from "../api/todolists-api";

import { AppRootStateType } from "./store";
import { handelNetworkError, handleServerNetworkError } from "../utils/error-utils";
import { appActions } from "./appReducer";
import { todolistActions, todolistThunks } from "./todolistsReducer";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";
import { handelServerAppError } from "utils/handelServerAppError";

const slice = createSlice({
   name: "tasks",
   initialState: {} as taskTodoType,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todo.id] = [];
         })
         .addCase(todolistThunks.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistID];
         })
         .addCase(todolistThunks.getTodolist.fulfilled, (state, action) => {
            action.payload.todolists.forEach((el) => {
               state[el.id] = [];
            });
         })
         .addCase(todolistActions.clearData, () => {
            return {};
         })
         .addCase(fetchTask.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks;
         })
         .addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask);
         })
         .addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
            if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
         })
         .addCase(removeTask.fulfilled, (state, action) => {
            const tasksForCurrentTodolist = state[action.payload.todolistID];
            const index = tasksForCurrentTodolist.findIndex((todo) => todo.id === action.payload.taskId);
            if (index !== -1) {
               tasksForCurrentTodolist.splice(index, 1);
            }
         });
   },
});

//types

export type updateDomainTaskModelType = {
   title?: string;
   description?: string | null;
   status?: number;
   priority?: number;
   startDate?: string | null;
   deadline?: string | null;
}; //нужен ли NULL ?

//thunk

export const fetchTask = createAppAsyncThunk<{ todolistID: string; tasks: TaskType[] }, string>(
   `${slice.name}/setTask`,
   async (todolistID, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(appActions.setAppStatus({ status: "loading" }));
      try {
         const data = await todolistsAPI.readTask(todolistID);

         dispatch(appActions.setAppStatus({ status: "succeeded" }));
         return { todolistID, tasks: data.data.items };
      } catch (error: any) {
         handleServerNetworkError(error, dispatch);
         return rejectWithValue(null);
      }
   },
);

type removeTaskType = { todolistID: string; taskId: string };

const removeTask = createAppAsyncThunk<removeTaskType, removeTaskType>(
   `${slice.name}/removeTask`,
   async ({ todolistID, taskId }, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(appActions.setAppStatus({ status: "loading" }));

      try {
         const data = await todolistsAPI.deleteTask(todolistID, taskId);
         if (data.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { todolistID, taskId };
         } else {
            handelServerAppError(data.data, dispatch);
            return rejectWithValue(null);
         }
      } catch (error: any) {
         handelNetworkError(error, dispatch);
         return rejectWithValue(null);
      }
   },
);

const addTask = createAppAsyncThunk<{ newTask: TaskType }, { todolistID: string; title: string }>(
   `${slice.name}/addTask`,
   async ({ todolistID, title }, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(appActions.setAppStatus({ status: "loading" }));

      try {
         const res = await todolistsAPI.createTask(todolistID, title);
         if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { newTask: res.data.data.item };
         } else {
            handelServerAppError(res.data, dispatch);
            return rejectWithValue(null);
         }
      } catch (error: any) {
         handleServerNetworkError(error, dispatch);
         return rejectWithValue(null);
      }
   },
);

const updateTask = createAppAsyncThunk<
   { todolistID: string; model: updateDomainTaskModelType; taskId: string },
   { todolistID: string; modelDomain: updateDomainTaskModelType; taskId: string }
   //можно вынести в один тип
>(`${slice.name}/updateTask`, async ({ todolistID, modelDomain, taskId }, thunkAPI) => {
   const { dispatch, rejectWithValue, getState } = thunkAPI;

   dispatch(appActions.setAppStatus({ status: "loading" }));

   try {
      const state = getState();
      const task = state.tasks[todolistID].find((el) => el.id === taskId);
      if (!task) {
         return rejectWithValue(null);
      }

      const modelApi: modelType = {
         title: task.title,
         description: task.description,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         ...modelDomain, //перезапишет те свойства modelApi, которые придут внутри modelDomain
      };

      const res = await todolistsAPI.updateTask(todolistID, taskId, modelApi);
      if (res.data.resultCode === 0) {
         dispatch(appActions.setAppStatus({ status: "succeeded" }));
         return { todolistID, model: modelDomain, taskId };
      } else {
         handleServerNetworkError(res.data, dispatch);
         return rejectWithValue(null);
      }
   } catch (error: any) {
      handelNetworkError(error, dispatch);
      return rejectWithValue(null);
   }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTask, addTask, updateTask, removeTask };
