import { PayloadAction, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { authThunks } from "features/login/model/authSlice";

export type RequestType = "idle" | "loading" | "succeeded" | "failed";

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>;

const slice = createSlice({
   name: "app",
   initialState: {
      isInitialized: false,
      status: "idle" as RequestType,
      error: null as string | null,
   },
   reducers: {
      setAppStatus: (state, action: PayloadAction<{ status: RequestType }>) => {
         state.status = action.payload.status;
      },
      setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
         state.error = action.payload.error;
      },
      setIsInitialized: (state, action: PayloadAction<{ status: boolean }>) => {
         state.isInitialized = action.payload.status;
      },
   },
   selectors: {
      selectIsInitialized: (sliceState) => sliceState.isInitialized,
      selectStatus: (sliceState) => sliceState.status,
      selectError: (sliceState) => sliceState.error,
   },
   extraReducers: (builder) => {
      builder
         // https://redux-toolkit.js.org/api/matching-utilities
         .addMatcher(isPending, (state, action) => {
            state.status = "loading";
         })
         .addMatcher(isFulfilled, (state, action) => {
            state.status = "succeeded";
         })
         .addMatcher(isRejected, (state, action: any) => {
            state.status = "failed";
            if (action.type === authThunks.initializeApp.rejected.type) {
               return;
            }
            if (action.payload) {
               state.error = action.payload.messages[0];
            } else {
               state.error = action.error.message;
            }
         });
   },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectError, selectIsInitialized, selectStatus } = slice.selectors;
