import { FilterValuesType, todolistsType } from "../App"

export const todolistsReducer = (state: todolistsType[], action: todolistsReducerType): todolistsType[] => {
   switch (action.type) {
      case "CHANGE-FILTER": {
         return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.value } : el)
      }
      case "REMOVE-TODOLIST": {
         return state.filter(el => el.id !== action.payload.todolistID)
      }
      case "ADD-TODOLIST": {
         const newTodo: todolistsType = { id: action.payload.id, title: action.payload.title, filter: 'all' }
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

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
   return {
      type: "REMOVE-TODOLIST",
      payload: {
         todolistID
      }
   } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, id: string) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         title,
         id
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