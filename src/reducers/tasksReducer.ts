import { v1 } from 'uuid';
import { taskTodoType } from '../App';
import { addTodolistACType, removeTodolistACType } from './todolistsReducer';

export const tasksReducer = (state: taskTodoType, action: taskReducerType): taskTodoType => {
   switch (action.type) {
      case "REMOVE-TASK": {
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
         }
      }
      case "ADD-TASK": {
         let newTask = { id: v1(), title: action.payload.title, isDone: false };
         return {
            ...state,
            [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
         }
      }
      case 'CHANGE-STATUS': {
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? { ...el, isDone: action.payload.isDone } : el)
         }
      }
      case "UPDATE-TASK": {
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? { ...el, title: action.payload.title } : el)
         }
      }
      case "ADD-TODOLIST": {
         return { ...state, [action.payload.todoID]: [] }
      }
      case "REMOVE-TODOLIST": {
         const copyState = { ...state }
         delete copyState[action.payload.todolistID]
         return copyState
      }

      default:
         return state
   }
}

type taskReducerType = removeTaskACType | addTaskACType | changeStatusACType | updateTaskACType | removeTodolistACType | addTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskId: string) => {
   return {
      type: "REMOVE-TASK",
      payload: {
         todolistID,
         taskId
      }
   } as const
}


type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
   return {
      type: "ADD-TASK",
      payload: {
         todolistID,
         title
      }
   } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
   return {
      type: "CHANGE-STATUS",
      payload: {
         todolistID,
         taskId,
         isDone
      }
   } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, title: string, taskId: string) => {
   return {
      type: "UPDATE-TASK",
      payload: {
         todolistID,
         title,
         taskId
      }
   } as const
}

// type addTaskForNewTodoACType = ReturnType<typeof addTaskForNewTodoAC>
// export const addTaskForNewTodoAC = (id: string) => {
//    return {
//       type: "ADD-TASK-FOR-NEW-TODO",
//       payload: {
//          id
//       }
//    } as const
// }
