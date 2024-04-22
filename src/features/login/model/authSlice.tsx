import { FormikErrorType } from "../ui/Login";
import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "../../../app/appSlice";
import { todolistActions } from "../../todolistsLists/model/todolistsSlice";
import { handelServerAppError } from "common/utils/handelServerAppError";
import { authAPI } from "features/login/api/auth-api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

const slice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
   },
   reducers: {},
   selectors: {
      selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
   },
   extraReducers: (builder) => {
      builder
         .addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
         })
         .addCase(logOut.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
         })
         .addCase(initializeApp.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
         });
   },
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormikErrorType>(
   `${slice.name}/login`,
   async (data, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;

      return thunkTryCatch(thunkAPI, async () => {
         const res = await authAPI.login(data);
         if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { isLoggedIn: true };
         } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handelServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data);
         }
      });
   },
);

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
   const { dispatch, rejectWithValue } = thunkAPI;
   dispatch(appActions.setAppStatus({ status: "loading" }));
   return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
         dispatch(todolistActions.clearData());
         dispatch(appActions.setAppStatus({ status: "succeeded" }));
         return { isLoggedIn: false };
      } else {
         handelServerAppError(res.data, dispatch, false);
         return rejectWithValue(null);
      }
   });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
   `${slice.name}/initializeApp`,
   async (_, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;

      return thunkTryCatch(thunkAPI, async () => {
         let res = await authAPI.me();

         if (res.data.resultCode === 0) {
            return { isLoggedIn: true };
         } else {
            handelServerAppError(res.data, dispatch, false);
            return rejectWithValue(null);
         }
      }).finally(() => {
         dispatch(appActions.setIsInitialized({ status: true }));
      });
   },
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logOut, initializeApp };
export const { selectIsLoggedIn } = slice.selectors;
