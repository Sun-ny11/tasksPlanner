import { BaseResponseType } from "../../../common/types/ResponseType";
import { instance } from "../../../api/instanse";
import { TodolistsType } from "./todolistsApi.types";

export const todolistsAPI = {
   createTodolists(title: string) {
      return instance.post<BaseResponseType<{ item: TodolistsType }>>("/todo-lists", { title: title });
   },
   readTodolists() {
      return instance.get<TodolistsType[]>("/todo-lists");
   },
   updateTodolists(title: string, todolistID: string) {
      return instance.put<BaseResponseType>(`/todo-lists/${todolistID}`, {
         title: title,
      });
   },
   deleteTodolists(todolistID: string) {
      return instance.delete<BaseResponseType>(`/todo-lists/${todolistID}`);
   },
   reorderTodolists(todolistId: string, putAfterItemId?: string | null) {
      return instance.put<BaseResponseType>(`todo-lists/${todolistId}/reorder`, { putAfterItemId });
   },
};
