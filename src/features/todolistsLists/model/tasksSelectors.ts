import { createSelector } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";

const tasks = (state: AppRootStateType) => state.tasks;

export const currentTask = (todolistID: string, taskId: string) =>
   createSelector([tasks], (tasks) => tasks[todolistID].filter((t) => t.id === taskId)[0]);
