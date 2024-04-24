import { AppRootStateType } from "app/store";
import { TaskStatus } from "common/enums/enums";
import { TaskType } from "features/todolistsLists/api/tasksApi.types";
import { TodolistsDomainType } from "features/todolistsLists/model/todolistsSlice";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Task } from "./task/Task";

type Props = {
   todolist: TodolistsDomainType;
};

export const Tasks = ({ todolist }: Props) => {
   let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[todolist.id]);

   let tasksForTodolist = tasks;

   tasksForTodolist = useMemo(() => {
      if (todolist.filter === "active") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.New);
      }
      if (todolist.filter === "completed") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.Completed);
      }
      return tasksForTodolist;
   }, [todolist.filter, tasks]);

   return <ul>{tasksForTodolist?.map((t) => <Task key={t.id} todolistID={todolist.id} taskId={t.id} />)}</ul>;
};
