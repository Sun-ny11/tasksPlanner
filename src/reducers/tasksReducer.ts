import { Dispatch, PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { taskTodoType } from "../Components/app/App";
import { TaskType, modelType, todolistsAPI } from "../api/todolists-api";

import { AppRootStateType } from "./store";
import { handelNetworkError, handelServerAppError } from "../utils/error-utils";
import { appActions } from "./appReducer";
import { todolistActions } from "./todolistsReducer";

const slice = createSlice({
   name: "tasks",
   initialState: {} as taskTodoType,
   reducers: {
      removeTask: (state, action: PayloadAction<{ todolistID: string; taskId: string }>) => {
         const tasksForCurrentTodolist = state[action.payload.todolistID];
         const index = tasksForCurrentTodolist.findIndex((todo) => todo.id === action.payload.taskId);
         if (index !== -1) {
            tasksForCurrentTodolist.splice(index, 1);
         }
      },
      addTask: (state, action: PayloadAction<{ newTask: TaskType }>) => {
         state[action.payload.newTask.todoListId].unshift(action.payload.newTask);
      },
      updateTask: (
         state,
         action: PayloadAction<{ todolistID: string; model: updateDomainTaskModelType; taskId: string }>,
      ) => {
         const tasks = state[action.payload.todolistID];
         const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
         if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
      },
      setTasks: (state, action: PayloadAction<{ todolistID: string; tasks: TaskType[] }>) => {
         state[action.payload.todolistID] = action.payload.tasks;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todo.id] = [];
         })
         .addCase(todolistActions.removeTodolist, (state, action) => {
            delete state[action.payload.todolistID];
         })
         .addCase(todolistActions.getTodolist, (state, action) => {
            action.payload.todolists.forEach((el) => {
               state[el.id] = [];
            });
         })
         .addCase(todolistActions.clearData, () => {
            return {};
         });
   },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

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

export const setTaskTC = (todolistID: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .readTask(todolistID)
         .then((data) => {
            if (data.data.error === null) {
               dispatch(tasksActions.setTasks({ todolistID, tasks: data.data.items }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};

export const removeTaskTC = (todolistID: string, taskID: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .deleteTask(todolistID, taskID)
         .then((data) => {
            if (data.data.resultCode === 0) {
               dispatch(tasksActions.removeTask({ todolistID, taskId: taskID }));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(data.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};

export const addTaskTC = (todolistID: string, title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .createTask(todolistID, title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(tasksActions.addTask({ newTask: res.data.data.item }));
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

export const updateTaskTC = (todolistID: string, modelDomain: updateDomainTaskModelType, taskId: string) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));

      const state = getState();
      const task = state.tasks[todolistID].find((el) => el.id === taskId);
      if (!task) {
         console.log("task not found");
         return;
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

      todolistsAPI
         .updateTask(todolistID, taskId, modelApi)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(tasksActions.updateTask({ todolistID, model: modelDomain, taskId }));
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
