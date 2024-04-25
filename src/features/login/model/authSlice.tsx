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
      captchaUrl: "" as string,
   },
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(captchaUrlThunk.fulfilled, (state, action) => {
            state.captchaUrl = action.payload.captchaUrl;
         })
         .addMatcher(
            isAnyOf(authThunks.login.fulfilled, authThunks.logOut.fulfilled, authThunks.initializeApp.fulfilled),
            (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
               state.isLoggedIn = action.payload.isLoggedIn;
               state.captchaUrl = "";
            },
         );
   },

   selectors: {
      selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
      selectCaptchaUrl: (sliceState) => sliceState.captchaUrl,
   },
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormikErrorType>(
   `${slice.name}/login`,
   async (data, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
         return { isLoggedIn: true };
      } else if (res.data.resultCode === 10) {
         dispatch(authThunks.captchaUrlThunk());
         return rejectWithValue(res.data);
      } else {
         return rejectWithValue(res.data);
      }
   },
);

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
   const { dispatch, rejectWithValue } = thunkAPI;
   const res = await authAPI.logOut();
   if (res.data.resultCode === 0) {
      dispatch(todolistActions.clearData());
      return { isLoggedIn: false };
   } else {
      return rejectWithValue(null);
   }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
   `${slice.name}/initializeApp`,
   async (_, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      let res = await authAPI.me();
      dispatch(appActions.setIsInitialized({ status: true }));

      if (res.data.resultCode === 0) {
         return { isLoggedIn: true };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

const captchaUrlThunk = createAppAsyncThunk<{ captchaUrl: string }, void>(`${slice.name}/captchaUrlThunk`, async () => {
   let res = await authAPI.getCaptchaUrl();
   return { captchaUrl: res.data.url };
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logOut, initializeApp, captchaUrlThunk };
export const { selectIsLoggedIn, selectCaptchaUrl } = slice.selectors;
