import { ResponseType } from "../utils/types/ResponseType";
import { Dispatch } from "@reduxjs/toolkit";
import { appActions } from "reducers/appReducer";

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
   if (data.messages.length > 0) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
   } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
   }
   dispatch(appActions.setAppStatus({ status: "failed" }));
};
