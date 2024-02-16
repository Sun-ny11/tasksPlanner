import { setAppError, setAppStatus } from "../reducers/appReducer";
import { ResponseType } from "./../api/todolists-api"
import { Dispatch } from "redux";
import { AppAllReducerType } from "../reducers/store";

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppAllReducerType>) => {
   if (data.messages.length > 0) {
      dispatch(setAppError(data.messages[0]));
   } else {
      dispatch(setAppError("Some error occurred"));
   }
   dispatch(setAppStatus("failed"));
}



export const handelNetworkError = (error: { message: string }, dispatch: Dispatch<AppAllReducerType>) => {
   dispatch(setAppError(error.message ? error.message : "Some error occurred"))
   dispatch(setAppStatus("failed"));
}