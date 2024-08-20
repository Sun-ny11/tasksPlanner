import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { selectIsInitialized } from "./appSlice";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { authThunks } from "features/login/model/authSlice";
import { TaskType } from "features/todolistsLists/api/tasksApi.types";
import { Routing } from "./Routing";
import { Header } from "./Header";
import { themeActions } from "Components/changeTheme/themeSlice";
import { useTheme } from "common/utils/useTheme";

export type taskTodoType = {
   [key: string]: TaskType[];
};

type Props = {
   demo?: boolean; //for stories
};

function App({ demo = false }: Props) {
   const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized);
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   const newTheme = useTheme();

   useEffect(() => {
      dispatch(authThunks.initializeApp());
      const theme = localStorage.getItem("themeColor");

      if (theme) {
         dispatch(themeActions.changeTheme(JSON.parse(theme)));
      }
   }, []);

   if (!isInitialized) {
      return (
         <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
            <CircularProgress />
         </div>
      );
   }

   return (
      <ThemeProvider theme={newTheme}>
         <div className="App">
            <Header />
            <Routing demo={demo} />
         </div>
      </ThemeProvider>
   );
}

export default App;
