
export type RequestType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
   //происходит ли взаимодействие с сервером 
   // idle не было запроса 
   // loading ждем ответа 
   // succeeded ответ
   // failed ошибка 
   status: RequestType
   //запишется текст ошибки 
   error: string | null
}
export type ActionAppType = setAppStatusType | setAppErrorType
export type setAppStatusType = ReturnType<typeof setAppStatus>
export type setAppErrorType = ReturnType<typeof setAppError>

const initialState: InitialStateType = {
   status: "idle",
   error: null
}
export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
   switch (action.type) {
      case "SET-STATUS": {
         return { ...state, status: action.payload.status };
      }
      case "SET-ERROR": {
         return { ...state, error: action.payload.error };
      }
      default:
         return state;;
   }
}

export const setAppStatus = (status: RequestType) => {
   return {
      type: "SET-STATUS",
      payload: {
         status
      }
   } as const
}
export const setAppError = (error: string | null) => {
   return {
      type: "SET-ERROR",
      payload: {
         error
      }
   } as const
}