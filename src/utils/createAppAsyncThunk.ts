import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppRootStateType } from "reducers/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
   state: AppRootStateType;
   rejectValue: null;
}>();
