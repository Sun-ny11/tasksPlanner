import { EditableSpan } from "Components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { TodolistsDomainType, todolistThunks } from "features/todolistsLists/model/todolistsSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";

type Props = {
   todolist: TodolistsDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   const removeTodolistHandler = () => {
      dispatch(todolistThunks.removeTodolist(todolist.id));
   };

   const updateTodolistTitleHandler = (title: string) => {
      dispatch(todolistThunks.updateTodolist({ todolistID: todolist.id, title }));
   };

   return (
      <h3>
         <EditableSpan oldTitle={todolist.title} collBack={updateTodolistTitleHandler} />
         <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
            <DeleteIcon />
         </IconButton>
      </h3>
   );
};
