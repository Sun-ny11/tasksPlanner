import { TaskPriorities, TaskStatus } from "common/enums/enums";
import { BaseResponseType } from "../utils/types/ResponseType";
import { instance } from "./instanse";

//types

export type todolistsType = {
   id: string;
   title: string;
   addedDate: string;
   order: number;
};

export type TaskType = {
   id: string;
   title: string;
   description: string | null;
   todoListId: string;
   order: number;
   status: TaskStatus;
   priority: TaskPriorities;
   startDate: string | null;
   deadline: string | null;
   addedDate: string;
};

type GetTaskResponseType = {
   items: TaskType[];
   totalCount: number;
   error: string | null;
};

export type modelType = {
   title: string;
   description: string | null;
   status: number;
   priority: number;
   startDate: string | null;
   deadline: string | null;
}; //нужен ли NULL ?

export const todolistsAPI = {
   //todolist

   createTodolists(title: string) {
      return instance.post<BaseResponseType<{ item: todolistsType }>>("/todo-lists", { title: title });
      //Will return promise
      //CREATE
   },
   readTodolists() {
      return instance.get<todolistsType[]>("/todo-lists");
      //Will return promise
      //READ
   },
   updateTodolists(title: string, todolistID: string) {
      return instance.put<BaseResponseType>(`/todo-lists/${todolistID}`, {
         title: title,
      });
      //Will return promise
      //UPDATE
   },
   deleteTodolists(todolistID: string) {
      return instance.delete<BaseResponseType>(`/todo-lists/${todolistID}`);
      //Will return promise
      //DELETE
   },

   //task

   readTask(todolistID: string) {
      return instance.get<GetTaskResponseType>(`/todo-lists/${todolistID}/tasks`);
   },
   createTask(todolistID: string, title: string) {
      return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, { title: title });
   },
   deleteTask(todolistID: string, taskId: string) {
      return instance.delete<BaseResponseType>(`/todo-lists/${todolistID}/tasks/${taskId}`);
   },
   updateTask(todolistID: string, taskID: string, model: modelType) {
      return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model);
   },
};
