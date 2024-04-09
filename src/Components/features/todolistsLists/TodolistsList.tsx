import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../reducers/store";
import { TodolistsDomainType, todolistThunks } from "../../../reducers/todolistsReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AddItemForm } from "../../management/AddItemForm";
import { Todolist } from "../todoList/Todolist";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "reducers/authReducer";

type TodolistsListType = {
   demo?: boolean;
};

export const TodolistsList: FC<TodolistsListType> = ({ demo = false }) => {
   let todolists = useSelector<AppRootStateType, TodolistsDomainType[]>((state) => state.todolists);
   const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn);

   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

   useEffect(() => {
      console.log(2);

      if (demo || !isLoggedIn) {
         return;
      }
      dispatch(todolistThunks.getTodolist());
   }, []);

   const addTodolist = useCallback(
      (title: string) => {
         dispatch(todolistThunks.addTodolist(title));
      },
      [dispatch],
   );

   if (isLoggedIn === false) {
      return <Navigate to={"/login"} />;
   }

   return (
      <>
         <Grid container style={{ padding: "20px" }}>
            <AddItemForm collBack={addTodolist} />
         </Grid>

         <Grid container spacing={3} justifyContent={"center"}>
            {todolists.map((el) => {
               return (
                  <Grid key={el.id} item justifyContent={"space-around"}>
                     <Paper elevation={3} style={{ padding: "20px" }}>
                        <Todolist
                           todolist={el}
                           // todolistID={el.id}
                           // title={el.title}
                           // filter={el.filter}
                           demo={demo}
                        />
                     </Paper>
                  </Grid>
               );
            })}
         </Grid>
      </>
   );
};
