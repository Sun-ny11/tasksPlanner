import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectError, selectIsInitialized, selectStatus } = slice.selectors;
