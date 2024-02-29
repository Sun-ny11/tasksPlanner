
export type RequestType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
   //происходит ли взаимодействие с сервером 
   // idle не было запроса 
   // loading ждем ответа 
   // succeeded ответ
   // failed ошибка 
   isInitialized: boolean
   status: RequestType
   //запишется текст ошибки 
   error: string | null
}
export type ActionAppType = setAppStatusType | setAppErrorType | setIsInitializedType
export type setAppStatusType = ReturnType<typeof setAppStatus>
export type setAppErrorType = ReturnType<typeof setAppError>
export type setIsInitializedType = ReturnType<typeof setIsInitialized>

const initialState: InitialStateType = {
   isInitialized: false,
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
      case "SET-IS-INITIALIZED":{
         return { ...state, isInitialized: action.payload.status };
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
export const setIsInitialized = (status: boolean) => {
   return {
      type: "SET-IS-INITIALIZED",
      payload: {
         status
      }
   } as const
}