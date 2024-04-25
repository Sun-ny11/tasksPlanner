import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { selectIsInitialized } from "./appSlice";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CircularProgress } from "@mui/material";
import { authThunks } from "features/login/model/authSlice";
import { TaskType } from "features/todolistsLists/api/tasksApi.types";
import { Routing } from "./Routing";
import { Header } from "./Header";

export type taskTodoType = {
   [key: string]: TaskType[];
};

type Props = {
   demo?: boolean; //for stories
};

function App({ demo = false }: Props) {
   const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized);
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   useEffect(() => {
      dispatch(authThunks.initializeApp());
   }, []);

   if (!isInitialized) {
      return (
         <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
            <CircularProgress />
         </div>
      );
   }

   return (
      <div className="App">
         <Header />
         <Routing demo={demo} />
      </div>
   );
}

export default App;
