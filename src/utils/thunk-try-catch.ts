import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Dispatch } from "@reduxjs/toolkit";
import { AppRootStateType } from "reducers/store";
import { handleServerNetworkError } from "./error-utils";
import { appActions } from "reducers/appReducer";
import { BaseResponseType } from "./types/ResponseType";

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