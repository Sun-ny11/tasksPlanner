import { ResponseType } from "./../api/todolists-api";
import { Dispatch } from "redux";
import { AppAllReducerType } from "../reducers/store";
import { appActions } from "reducers/appReducer";

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
   if (data.messages.length > 0) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
   } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
   }
   dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handelNetworkError = (error: { message: string }, dispatch: Dispatch) => {
   dispatch(appActions.setAppError({ error: error.message ? error.message : "Some error occurred" }));
   dispatch(appActions.setAppStatus({ status: "failed" }));
};
