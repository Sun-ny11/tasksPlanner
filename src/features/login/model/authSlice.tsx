import { FormikErrorType } from "../ui/Login";
import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { appActions } from "../../../app/appSlice";
import { todolistActions } from "../../todolistsLists/model/todolistsSlice";
import { authAPI } from "features/login/api/auth-api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

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
      builder.addMatcher(
         isAnyOf(authThunks.login.fulfilled, authThunks.logOut.fulfilled, authThunks.initializeApp.fulfilled),
         (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
         },
      );
   },
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormikErrorType>(
   `${slice.name}/login`,
   async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
         return { isLoggedIn: true };
      } else {
         const isShowAppError = !res.data.fieldsErrors.length;
         return rejectWithValue(res.data);
      }
   },
);

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
   const { dispatch, rejectWithValue } = thunkAPI;
   const res = await authAPI.logOut();
   if (res.data.resultCode === 0) {
      dispatch(todolistActions.clearData());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: false };
   } else {
      return rejectWithValue(null);
   }
});

//ошибка при старте You are not authorized

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
   `${slice.name}/initializeApp`,
   async (_, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      let res = await authAPI.me().finally(() => {
         dispatch(appActions.setIsInitialized({ status: true }));
      });

      if (res.data.resultCode === 0) {
         return { isLoggedIn: true };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logOut, initializeApp };
export const { selectIsLoggedIn } = slice.selectors;
