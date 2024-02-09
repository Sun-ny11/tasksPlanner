import { addTodolistACType, getTodolistACType, removeTodolistACType } from './todolistsReducer';
import { taskTodoType } from '../AppWidthRedux';
import { TaskType, modelType, todolistsAPI } from '../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

const initialState: taskTodoType = {}

export const tasksReducer = (state: taskTodoType = initialState, action: taskReducerType): taskTodoType => {
   switch (action.type) {
      case "REMOVE-TASK": {
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
         }
      }
      case "ADD-TASK": {
         return {
            ...state,
            [action.payload.newTask.todoListId]: [action.payload.newTask, ...state[action.payload.newTask.todoListId]]
         }
      }

      case "UPDATE-TASK": {
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? { ...el, ...action.payload.model } : el)
         }
      }
      case "ADD-TODOLIST": {
         return { ...state, [action.payload.todo.id]: [] }
      }
      case "REMOVE-TODOLIST": {
         const copyState = { ...state }
         delete copyState[action.payload.todolistID]
         return copyState
      }
      case 'GET-TODOLIST': {
         const copyState = { ...state }
         action.payload.todolists.forEach(el => {
            copyState[el.id] = []
         })
         return copyState
      }
      case 'SET-TASKS': {
         return { ...state, [action.payload.todolistID]: action.payload.tasks }
      }

      default:
         return state
   }
}

type taskReducerType = removeTaskACType
   | addTaskACType
   | updateTaskACType
   | removeTodolistACType
   | addTodolistACType
   | getTodolistACType
   | setTasksACType


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

export const addTaskAC = (newTask: TaskType) => {
   return {
      type: "ADD-TASK",
      payload: {
         newTask
      }
   } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, model: updateDomainTaskModelType, taskId: string) => {
   return {
      type: "UPDATE-TASK",
      payload: {
         todolistID,
         model,
         taskId
      }
   } as const
}


type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
   return {
      type: "SET-TASKS",
      payload: {
         todolistID,
         tasks
      }
   } as const
}

export const setTaskTC = (todolistID: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.readTask(todolistID)
         .then(data => dispatch(setTasksAC(todolistID, data.data.items)))
   }
}

export const removeTaskTC = (todolistID: string, taskID: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.deleteTask(todolistID, taskID)
         .then(data => dispatch(removeTaskAC(todolistID, taskID)))
   }
}

export const addTaskTC = (todolistID: string, title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.createTask(todolistID, title)
         .then(res => {
            dispatch(addTaskAC(res.data.data.item))
         })
   }
}


export type updateDomainTaskModelType = {
   title?: string
   description?: string | null
   status?: number
   priority?: number
   startDate?: string | null
   deadline?: string | null
}//нужен ли NULL ?

export const updateTaskTC = (todolistID: string, modelDomain: updateDomainTaskModelType, taskId: string) => {

   return (dispatch: Dispatch, getState: () => AppRootStateType) => {

      const state = getState()
      const task = state.tasks[todolistID].find(el => el.id === taskId)
      if (!task) {
         console.log("task not found")
         return
      }

      const modelApi: modelType = {
         title: task.title,
         description: task.description,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         ...modelDomain//перезапишет те свойства modelApi, которые придут внутри modelDomain
      }

      todolistsAPI.updateTask(todolistID, taskId, modelApi)
         .then(res => dispatch(updateTaskAC(todolistID, modelDomain, taskId)))

   }
}
