import { createSlice } from "@reduxjs/toolkit";
import { taskTodoType } from "../../../app/App";
import { todolistActions, todolistThunks } from "./todolistsSlice";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { tasksAPI } from "../api/tasksApi";
import { ModelType, TaskType } from "../api/tasksApi.types";

const slice = createSlice({
   name: "tasks",
   initialState: {} as taskTodoType,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(todolistThunks.addTodolist.fulfilled, (state, action) => {
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
   async (todolistID) => {
      const data = await tasksAPI.readTask(todolistID);
      return { todolistID, tasks: data.data.items };
   },
);

type removeTaskType = { todolistID: string; taskId: string };

const removeTask = createAppAsyncThunk<removeTaskType, removeTaskType>(
   `${slice.name}/removeTask`,
   async ({ todolistID, taskId }, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;

      const data = await tasksAPI.deleteTask(todolistID, taskId);
      if (data.data.resultCode === 0) {
         return { todolistID, taskId };
      } else {
         return rejectWithValue(data.data);
      }
   },
);

const addTask = createAppAsyncThunk<{ newTask: TaskType }, { todolistID: string; title: string }>(
   `${slice.name}/addTask`,
   async ({ todolistID, title }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      const res = await tasksAPI.createTask(todolistID, title);
      if (res.data.resultCode === 0) {
         return { newTask: res.data.data.item };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

const updateTask = createAppAsyncThunk<
   { todolistID: string; model: updateDomainTaskModelType; taskId: string },
   { todolistID: string; modelDomain: updateDomainTaskModelType; taskId: string }
>(`${slice.name}/updateTask`, async ({ todolistID, modelDomain, taskId }, thunkAPI) => {
   const { rejectWithValue, getState } = thunkAPI;

   const state = getState();
   const task = state.tasks[todolistID].find((el) => el.id === taskId);
   if (!task) {
      return rejectWithValue(null);
   }

   const modelApi: ModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...modelDomain, //перезапишет те свойства modelApi, которые придут внутри modelDomain
   };

   const res = await tasksAPI.updateTask(todolistID, taskId, modelApi);
   if (res.data.resultCode === 0) {
      return { todolistID, model: modelDomain, taskId };
   } else {
      return rejectWithValue(res.data);
   }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTask, addTask, updateTask, removeTask };
