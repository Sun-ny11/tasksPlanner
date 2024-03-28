import { error } from "console";
import { todolistsAPI, todolistsType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppAllReducerType } from "./store";
import { RequestType, appActions } from "./appReducer";
import { handelNetworkError, handelServerAppError } from "../utils/error-utils";

//types

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsDomainType = todolistsType & {
   filter: FilterValuesType;
   entityStatus: RequestType;
};

export type todolistsReducerType =
   | changeFilterACType
   | removeTodolistACType
   | addTodolistACType
   | updateTodolistACType
   | getTodolistACType
   | changeTodolistEntityStatusACType;

type changeFilterACType = ReturnType<typeof changeFilterAC>;
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
type updateTodolistACType = ReturnType<typeof updateTodolistAC>;
export type getTodolistACType = ReturnType<typeof getTodolistAC>;
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;

const initialState: TodolistsDomainType[] = [];

export const todolistsReducer = (
   state: TodolistsDomainType[] = initialState,
   action: todolistsReducerType,
): TodolistsDomainType[] => {
   switch (action.type) {
      case "CHANGE-FILTER": {
         return state.map((el) => (el.id === action.payload.todolistID ? { ...el, filter: action.payload.value } : el));
      }
      case "REMOVE-TODOLIST": {
         return state.filter((el) => el.id !== action.payload.todolistID);
      }
      case "ADD-TODOLIST": {
         return [...state, { ...action.payload.todo, filter: "all", entityStatus: "idle" }];
      }
      case "UPDATE-TODOLIST": {
         return state.map((el) => (el.id === action.payload.todolistID ? { ...el, title: action.payload.title } : el));
      }
      case "GET-TODOLIST": {
         return action.payload.todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }));
      }
      case "CHANGE-TODOLIST-ENTITY-STATUS": {
         return state.map((el) =>
            el.id === action.payload.todolistID ? { ...el, entityStatus: action.payload.status } : el,
         );
      }
      default:
         return state;
   }
};

//action

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
   return {
      type: "CHANGE-FILTER",
      payload: {
         todolistID,
         value,
      },
   } as const;
};

export const removeTodolistAC = (todolistID: string) => {
   return {
      type: "REMOVE-TODOLIST",
      payload: {
         todolistID,
      },
   } as const;
};

export const addTodolistAC = (todo: todolistsType) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         todo,
      },
   } as const;
};

export const updateTodolistAC = (todolistID: string, title: string) => {
   return {
      type: "UPDATE-TODOLIST",
      payload: {
         todolistID,
         title,
      },
   } as const;
};

export const getTodolistAC = (todolists: todolistsType[]) => {
   return {
      type: "GET-TODOLIST",
      payload: {
         todolists,
      },
   } as const;
};

export const changeTodolistEntityStatusAC = (status: RequestType, todolistID: string) => {
   return {
      type: "CHANGE-TODOLIST-ENTITY-STATUS",
      payload: {
         status,
         todolistID,
      },
   } as const;
};

//thunk

//Для того чтобы диспачить санку из санки:

// ThunkAction<void,AppRootStateType,unknown,AppAllReducerType> типизация

// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App

export const getTodolistTC = () => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .readTodolists()
         .then((res) => {
            if (res.statusText === "") {
               dispatch(getTodolistAC(res.data));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const removeTodolistTC = (todolistID: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(changeTodolistEntityStatusAC("loading", todolistID));
      todolistsAPI
         .deleteTodolists(todolistID)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(removeTodolistAC(todolistID));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .createTodolists(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTodolistAC(res.data.data.item));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
export const updateTodolistTC = (todolistID: string, title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
         .updateTodolists(title, todolistID)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(updateTodolistAC(todolistID, title));
               dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
               handelServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handelNetworkError(error, dispatch);
         });
   };
};
