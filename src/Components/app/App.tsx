import React, { useEffect } from "react";
import "./App.css";
import Btn from "../management/Btn";
import Container from "@mui/material/Container";
import { TaskType } from "../../api/todolists-api";
import { TodolistsList } from "../features/todolistsLists/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorSnackbar from "../errorSnackbar/ErrorSnackbar";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../reducers/store";
import { RequestType, selectIsInitialized, selectStatus } from "../../reducers/appReducer";
import { useDispatch } from "react-redux";
import { Login } from "../features/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { initializeAppTC } from "../../reducers/authReducer";
import { CircularProgress } from "@mui/material";

export type taskTodoType = {
   [key: string]: TaskType[];
};

type PropsType = {
   demo?: boolean;
};

function App({ demo = false }: PropsType) {
   const status = useSelector<AppRootStateType, RequestType>(selectStatus);
   const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized);
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();
   console.log("APP");

   useEffect(() => {
      console.log(1);

      dispatch(initializeAppTC());
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
         <ErrorSnackbar />
         <Btn />
         {status === "loading" && <LinearProgress />}
         <Container>
            <Routes>
               <Route path={"/second-todolist"} element={<TodolistsList demo={demo} />} />
               <Route path={"/login"} element={<Login />} />
               <Route path={"/error404"} element={<h1>404 page not found</h1>} />
               <Route path={"/*"} element={<Navigate to={"/error404"} />} />
            </Routes>
         </Container>
      </div>
   );
}

export default App;
