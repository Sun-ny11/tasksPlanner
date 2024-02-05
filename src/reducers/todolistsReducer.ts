import { v1 } from "uuid"
import { todolistsType } from "../api/todolists-api"


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsDomainType = todolistsType & {
   filter: FilterValuesType
}

const initialState: TodolistsDomainType[] = []

export const todolistsReducer = (state: TodolistsDomainType[] = initialState, action: todolistsReducerType): TodolistsDomainType[] => {
   switch (action.type) {
      case "CHANGE-FILTER": {
         return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.value } : el)
      }
      case "REMOVE-TODOLIST": {
         return state.filter(el => el.id !== action.payload.todolistID)
      }
      case "ADD-TODOLIST": {
         const newTodo: TodolistsDomainType = { id: action.payload.todoID, title: action.payload.title, addedDate: "",order:0, filter: 'all' }
         return [...state, newTodo]
      }
      case "UPDATE-TODOLIST": {
         return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.title } : el)

      }
      default:
         return state
   }
}
type todolistsReducerType = changeFilterACType | removeTodolistACType | addTodolistACType | updateTodolistACType
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
   return {
      type: "CHANGE-FILTER",
      payload: {
         todolistID,
         value
      }
   } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
   return {
      type: "REMOVE-TODOLIST",
      payload: {
         todolistID
      }
   } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         title,
         todoID: v1()
      }
   } as const
}

type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistID: string, title: string) => {
   return {
      type: "UPDATE-TODOLIST",
      payload: {
         todolistID,
         title
      }
   } as const
}