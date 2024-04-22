import React, { memo, useCallback, useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "./task/Task";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { TodolistsDomainType, todolistActions, todolistThunks } from "../../model/todolistsSlice";
import { AppRootStateType } from "../../../../app/store";
import { tasksThunks } from "../../model/tasksSlice";
import { EditableSpan } from "../../../../Components/editableSpan/EditableSpan";
import { AddItemForm } from "../../../../Components/addItemForm/AddItemForm";
import { FilterButton } from "../../../../Components/filterButton/FilterButton";
import { TaskStatus } from "common/enums/enums";
import { TaskType } from "features/todolistsLists/api/tasksApi.types";
import { DragAndDropWrap } from "Components/dragAndDropWrap/DragAndDropWrap";

type Props = {
   todolist: TodolistsDomainType;
   demo?: boolean;
};

export const Todolist = memo(({ demo = false, todolist }: Props) => {
   let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[todolist.id]);

   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   useEffect(() => {
      if (demo) {
         return;
      }
      dispatch(tasksThunks.fetchTask(todolist.id));
   }, []);

   let tasksForTodolist = tasks;

   tasksForTodolist = useMemo(() => {
      if (todolist.filter === "active") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.New);
      }
      if (todolist.filter === "completed") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.Completed);
      }
      return tasksForTodolist;
   }, [todolist.filter, tasks]);

   const changeFilterAllHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: todolist.id, value: "all" })),
      [dispatch, todolist.id],
   );
   const changeFilterActiveHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: todolist.id, value: "active" })),
      [dispatch, todolist.id],
   );
   const changeFilterCompletedHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: todolist.id, value: "completed" })),
      [dispatch, todolist.id],
   );

   const removeTodolistHandler = () => {
      dispatch(todolistThunks.removeTodolist(todolist.id));
   };

   const addTaskHandler = useCallback(
      (title: string) => {
         dispatch(tasksThunks.addTask({ todolistID: todolist.id, title }));
      },
      [dispatch, todolist.id],
   );

   const updateTodolistTitleHandler = useCallback(
      (title: string) => {
         dispatch(todolistThunks.updateTodolist({ todolistID: todolist.id, title }));
      },
      [dispatch, todolist.id],
   );

   return (
      <DragAndDropWrap todolist={todolist}>
         <h3>
            <EditableSpan oldTitle={todolist.title} collBack={updateTodolistTitleHandler} />
            <IconButton
               aria-label="delete"
               onClick={removeTodolistHandler}
               disabled={todolist.entityStatus === "loading"}
            >
               <DeleteIcon />
            </IconButton>
         </h3>
         <AddItemForm collBack={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
         <ul>{tasksForTodolist?.map((t) => <Task key={t.id} todolistID={todolist.id} taskId={t.id} />)}</ul>
         <div>
            <FilterButton
               onClick={changeFilterAllHandler}
               name={"All"}
               color="success"
               variant={todolist.filter === "all" ? "outlined" : "contained"}
            />
            <FilterButton
               onClick={changeFilterActiveHandler}
               name={"Active"}
               variant={todolist.filter === "active" ? "outlined" : "contained"}
            />
            <FilterButton
               onClick={changeFilterCompletedHandler}
               name={"Completed"}
               variant={todolist.filter === "completed" ? "outlined" : "contained"}
            />
         </div>
      </DragAndDropWrap>
   );
});
