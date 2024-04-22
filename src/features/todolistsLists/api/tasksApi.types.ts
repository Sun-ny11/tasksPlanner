import { TaskPriorities, TaskStatus } from "common/enums/enums";

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

export type GetTaskResponseType = {
   items: TaskType[];
   totalCount: number;
   error: string | null;
};

export type ModelType = {
   title: string;
   description: string | null;
   status: number;
   priority: number;
   startDate: string | null;
   deadline: string | null;
}; //нужен ли NULL ?
