import { AnyAction } from "@reduxjs/toolkit";
import { FilterButton } from "Components/filterButton/FilterButton";
import { AppRootStateType } from "app/store";
import { FilterValuesType, TodolistsDomainType, todolistActions } from "features/todolistsLists/model/todolistsSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

type Props = {
   todolist: TodolistsDomainType;
};
export const FilterTasksButtons = ({ todolist }: Props) => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   const changeFilterHandler = (value: FilterValuesType) =>
      dispatch(todolistActions.changeFilter({ todolistID: todolist.id, value }));

   return (
      <>
         <FilterButton
            onClick={() => changeFilterHandler("all")}
            name={"All"}
            color="success"
            variant={todolist.filter === "all" ? "outlined" : "contained"}
         />
         <FilterButton
            onClick={() => changeFilterHandler("active")}
            name={"Active"}
            variant={todolist.filter === "active" ? "outlined" : "contained"}
         />
         <FilterButton
            onClick={() => changeFilterHandler("completed")}
            name={"Completed"}
            variant={todolist.filter === "completed" ? "outlined" : "contained"}
         />
      </>
   );
};
