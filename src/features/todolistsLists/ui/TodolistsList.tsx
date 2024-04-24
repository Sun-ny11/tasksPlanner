import React, { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../app/store";
import { todolistThunks, todolistsSlice } from "../model/todolistsSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AddItemForm } from "../../../Components/addItemForm/AddItemForm";
import { Todolist } from "./todoList/Todolist";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "features/login/model/authSlice";

type TodolistsListType = {
   demo?: boolean;
};

export const TodolistsList: FC<TodolistsListType> = ({ demo = false }) => {
   let todolists = useSelector(todolistsSlice);
   const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn);

   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

   useEffect(() => {
      if (demo || !isLoggedIn) {
         return;
      }
      dispatch(todolistThunks.getTodolist());
   }, []);

   /**
    *
    * @param title
    * @returns - промис для AddItemForm
    * @unwrap - санка всегда резолвится если созданна через createAsyncThunk, unwrap вернет привычную логику
    *
    */
   const addTodolistHandler = useCallback(
      (title: string) => {
         return dispatch(todolistThunks.addTodolist(title)).unwrap();
      },
      [dispatch],
   );

   if (isLoggedIn === false) {
      return <Navigate to={"/login"} />;
   }

   return (
      <>
         <Grid container style={{ padding: "20px" }}>
            <AddItemForm collBack={addTodolistHandler} />
         </Grid>

         <Grid container spacing={3} justifyContent={"center"}>
            {todolists.map((el) => {
               return (
                  <Grid key={el.id} item justifyContent={"space-around"}>
                     <Paper elevation={3} style={{ padding: "20px" }}>
                        <Todolist todolist={el} demo={demo} />
                     </Paper>
                  </Grid>
               );
            })}
         </Grid>
      </>
   );
};
