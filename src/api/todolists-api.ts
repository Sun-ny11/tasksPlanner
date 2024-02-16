import axios from "axios"

//types

export type todolistsType = {
   id: string
   title: string
   addedDate: string
   order: number
}

export type ResponseType<D = {}> = {
   resultCode: number
   messages: string[],
   data: D
}

export enum TaskStatus {
   New = 0,//если isDone:false
   InProgress = 1,
   Completed = 2,//если isDone:true
   Draft = 3
}

export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4
}

export type TaskType = {
   id: string
   title: string
   description: string | null,
   todoListId: string
   order: number
   status: TaskStatus
   priority: TaskPriorities
   startDate: string | null,
   deadline: string | null,
   addedDate: string
}

type GetTaskResponseType = {
   items: TaskType[]
   totalCount: number
   error: string | null
}

export type modelType = {
   title: string
   description: string | null
   status: number
   priority: number
   startDate: string | null
   deadline: string | null
}//нужен ли NULL ?



const settings = {
   withCredentials: true,
   apikey: "fb565e66-163c-404a-8bfa-c7212c08dd95"
}

const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   ...settings
})
export const todolistsAPI = {

   //todolist

   createTodolists(title: string) {
      return instance.post<ResponseType<{ item: todolistsType }>>("/todo-lists", { title: title })
      //Will return promise
      //CREATE
   },
   readTodolists() {
      return instance.get<todolistsType[]>("/todo-lists")
      //Will return promise
      //READ
   },
   updateTodolists(title: string, todolistID: string) {
      return instance.put<ResponseType>(`/todo-lists/${todolistID}`, { title: title })
      //Will return promise
      //UPDATE
   },
   deleteTodolists(todolistID: string) {
      return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
      //Will return promise
      //DELETE
   },

   //task

   readTask(todolistID: string) {
      return instance.get<GetTaskResponseType>(`/todo-lists/${todolistID}/tasks`)
   },
   createTask(todolistID: string, title: string) {
      return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, { title: title })
   },
   deleteTask(todolistID: string, taskID: string) {
      return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
   },
   updateTask(todolistID: string, taskID: string, model: modelType) {
      return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
   }
}