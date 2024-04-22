import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Dispatch } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";
import { handleServerNetworkError } from "./error-utils";
import { appActions } from "app/appSlice";
import { BaseResponseType } from "../types/ResponseType";

/**
 * thunkTryCatch - утилита для санок
 * @param thunkAPI
 * @param logic
 * @returns
 */

export const thunkTryCatch = async <T>(
   thunkAPI: BaseThunkAPI<AppRootStateType, unknown, Dispatch, null | BaseResponseType>,
   logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
   const { dispatch, rejectWithValue } = thunkAPI;
   dispatch(appActions.setAppStatus({ status: "loading" }));
   try {
      return await logic();
   } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
   } finally {
      dispatch(appActions.setAppStatus({ status: "idle" }));
   }
};
