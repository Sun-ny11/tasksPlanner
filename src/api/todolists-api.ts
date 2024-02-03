import axios from "axios"

export type TodolistType = {
   id: string
   title: string
   addedDate: string
   order: number
}

type ResponseType<D = {}> = {
   resultCode: number
   messages: string[],
   data: D
}



type TaskResponseType = {
   id: string
   title: string
   description: string | null,
   todoListId: string
   order: number
   status: number
   priority: number
   startDate: string | null,
   deadline: string | null,
   addedDate: string
}

type GetTaskResponseType = {
   items: TaskResponseType[]
   totalCount: number
   error: string | null
}

type modelType = {
   title: string
   description: string
   completed: boolean
   status: number
   priority: number
   startDate: string
   deadline: string
}

const settings = { withCredentials: true }

const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   ...settings
})
export const todolistsAPI = {
   postTodolists(title: string) {
      return instance.post<ResponseType<{ item: TodolistType }>>("/todo-lists", { title: title })
      //Will return promise
      //CREATE
   },
   getTodolists() {
      return instance.get<TodolistType[]>("/todo-lists")
      //Will return promise
      //READ
   },
   putTodolists(title: string, todolistID: string) {
      return instance.put<ResponseType>(`/todo-lists/${todolistID}`, { title: title })
      //Will return promise
      //UPDATE
   },
   deleteTodolists(todolistID: string) {
      return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
      //Will return promise
      //DELETE
   },

   getTask(todolistID: string) {
      return instance.get<GetTaskResponseType>(`/todo-lists/${todolistID}/tasks`)
   },
   postTask(todolistID: string, title: string) {
      return instance.post(`/todo-lists/${todolistID}/tasks`, { title: title })
      //Will return promise
      //CREATE
   },
   deleteTask(todolistID: string, taskID: string) {
      return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
   },
   updateTask(todolistID: string, taskID: string, title: string) {
      return instance.put<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`, { title: title })
   }
}