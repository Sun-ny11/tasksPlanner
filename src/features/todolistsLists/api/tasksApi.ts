import { BaseResponseType } from "../../../common/types/ResponseType";
import { instance } from "../../../api/instanse";
import { GetTaskResponseType, TaskType, ModelType } from "./tasksApi.types";

export const tasksAPI = {
   readTask(todolistID: string) {
      return instance.get<GetTaskResponseType>(`/todo-lists/${todolistID}/tasks`);
   },
   createTask(todolistID: string, title: string) {
      return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, { title: title });
   },
   deleteTask(todolistID: string, taskId: string) {
      return instance.delete<BaseResponseType>(`/todo-lists/${todolistID}/tasks/${taskId}`);
   },
   updateTask(todolistID: string, taskID: string, model: ModelType) {
      return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model);
   },
};
