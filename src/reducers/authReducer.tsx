import { Dispatch } from 'redux'
import { setAppStatus, setAppStatusType, setIsInitialized } from './appReducer'
import { AppAllReducerType } from './store'
import { authAPI } from '../api/todolists-api'
import { FormikErrorType } from '../Components/features/login/Login'
import { handelNetworkError, handelServerAppError } from '../utils/error-utils'


export type authReducerType = ReturnType<typeof setIsLoggedInAC> | setAppStatusType

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: authReducerType): InitialStateType => {
   switch (action.type) {
      case 'login/SET-IS-LOGGED-IN':
         return { ...state, isLoggedIn: action.value }
      default:
         return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: FormikErrorType) => async (dispatch: Dispatch<AppAllReducerType>) => {
   dispatch(setAppStatus('loading'))
   try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true))
         dispatch(setAppStatus('succeeded'))
      } else {
         handelServerAppError(res.data, dispatch)
      }
   } catch (e) {
      handelNetworkError((e as { message: string }), dispatch)

   }
}
export const logOutTC = () => async (dispatch: Dispatch<AppAllReducerType>) => {
   dispatch(setAppStatus('loading'))
   try {
      const res = await authAPI.logOut()
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(false))
         dispatch(setAppStatus('succeeded'))
      } else {
         handelServerAppError(res.data, dispatch)
      }
   } catch (e) {
      handelNetworkError((e as { message: string }), dispatch)

   }
}

export const initializeAppTC = () => async (dispatch: Dispatch<AppAllReducerType>) => {
   dispatch(setAppStatus('loading'))
   try {
      let res = await authAPI.me()
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppStatus('succeeded'))

      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true));
      } else {
      }
   } catch (e) {

   } finally {
      dispatch(setIsInitialized(true))
   }

}