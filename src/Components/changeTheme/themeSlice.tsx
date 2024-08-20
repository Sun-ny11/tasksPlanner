import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type ThemeType = {
   main: string;
};

const initialState: ThemeType = {
   main: "#9ccc65",
};

export const theme = createSlice({
   name: "theme",
   initialState,
   reducers: {
      changeTheme: (state, action: PayloadAction<string>) => {
         state.main = action.payload;
      },
   },
   selectors: {
      themeState: (sliceState) => sliceState.main,
   },
});
export const themeReducer = theme.reducer;
export const themeActions = theme.actions;
export const { themeState } = theme.selectors;
