import { todolistsAPI, todolistsType } from "../api/todolists-api"
import { Dispatch } from "redux";


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
         return [...state, { ...action.payload.todo, filter: 'all' }]
      }
      case "UPDATE-TODOLIST": {
         return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.title } : el)

      }
      case "GET-TODOLIST": {
         return action.payload.todolists.map(el => ({ ...el, filter: "all" }))
      }
      default:
         return state
   }
}
type todolistsReducerType = changeFilterACType | removeTodolistACType | addTodolistACType | updateTodolistACType | getTodolistACType
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
export const addTodolistAC = (todo: todolistsType) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         todo
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

export type getTodolistACType = ReturnType<typeof getTodolistAC>
export const getTodolistAC = (todolists: todolistsType[]) => {
   return {
      type: "GET-TODOLIST",
      payload: {
         todolists
      }
   } as const
}

export const getTodolistTC = () => {
   return (dispatch: Dispatch) => {
      todolistsAPI.readTodolists()
         .then((res) => { dispatch(getTodolistAC(res.data)) })
   }

}
export const removeTodolistTC = (todolistID: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.deleteTodolists(todolistID)
         .then(res => dispatch(removeTodolistAC(todolistID)))
   }
}
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.createTodolists(title)
         .then(res => dispatch(addTodolistAC(res.data.data.item)))
   }
}
export const updateTodolistTC = (todolistID: string, title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.updateTodolists(title, todolistID)
         .then(res => dispatch(updateTodolistAC(todolistID, title)))
   }
}
