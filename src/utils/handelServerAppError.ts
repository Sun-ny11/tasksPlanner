import { BaseResponseType } from "../utils/types/ResponseType";
import { Dispatch } from "@reduxjs/toolkit";
import { appActions } from "reducers/appReducer";

/**
 * handelServerAppError - вавтыат
 * @param data-dfg
 * @param dispatch-gfh
 * @param showGlobalError-0
 * @returns {void} - ytd
 *
 */
export const handelServerAppError = <D>(
   data: BaseResponseType<D>,
   dispatch: Dispatch,
   showGlobalError: boolean = true,
) => {
   if (showGlobalError) {
      if (data.messages.length > 0) {
         dispatch(appActions.setAppError({ error: data.messages[0] }));
      } else {
         dispatch(appActions.setAppError({ error: "Some error occurred" }));
      }
      dispatch(appActions.setAppStatus({ status: "failed" }));
   }
};
