import React, { DragEvent, memo, useCallback, useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "./task/Task";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { TodolistsDomainType, todolistActions, todolistThunks } from "../../../reducers/todolistsReducer";
import { AppRootStateType } from "../../../reducers/store";
import { TaskType } from "../../../api/todolists-api";
import { tasksThunks } from "../../../reducers/tasksReducer";
import { EditableSpan } from "../../management/EditableSpan";
import { AddItemForm } from "../../management/AddItemForm";
import { ButtonWithRedux } from "../../management/ButtonWithRedux";
import { TaskStatus } from "common/enums/enums";

type PropsType = {
   todolist: TodolistsDomainType;
   // todolistID: string
   // title: string
   // filter: FilterValuesType
   demo?: boolean;
};
//sad

export const Todolist = memo(({ demo = false, ...props }: PropsType) => {
   console.log("Todolist " + props.todolist.title);

   let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[props.todolist.id]);

   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   useEffect(() => {
      console.log(3);

      if (demo) {
         return;
      }
      dispatch(tasksThunks.fetchTask(props.todolist.id));
   }, []);

   let tasksForTodolist = tasks;

   tasksForTodolist = useMemo(() => {
      if (props.todolist.filter === "active") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.New);
      }
      if (props.todolist.filter === "completed") {
         tasksForTodolist = tasks.filter((t) => t.status === TaskStatus.Completed);
      }
      return tasksForTodolist;
   }, [props.todolist.filter, tasks]);

   const onAllClickHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: props.todolist.id, value: "all" })),
      [dispatch, props.todolist.id],
   );
   const onActiveClickHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: props.todolist.id, value: "active" })),
      [dispatch, props.todolist.id],
   );
   const onCompletedClickHandler = useCallback(
      () => dispatch(todolistActions.changeFilter({ todolistID: props.todolist.id, value: "completed" })),
      [dispatch, props.todolist.id],
   );

   const removeTodolistHandler = () => {
      console.log(props.todolist.entityStatus);

      dispatch(todolistThunks.removeTodolist(props.todolist.id));
   };

   const addTaskHandler = useCallback(
      (title: string) => {
         dispatch(tasksThunks.addTask({ todolistID: props.todolist.id, title }));
      },
      [dispatch, props.todolist.id],
   );

   const updateTodolistHandler = useCallback(
      (title: string) => {
         dispatch(todolistThunks.updateTodolist({ todolistID: props.todolist.id, title }));
      },
      [dispatch, props.todolist.id],
   );

   const dragStartHandler = (e: DragEvent<HTMLDivElement>, todo: TodolistsDomainType) => {
      //взяли карту
      e.dataTransfer.setData("string", todo.id);
      console.log(todo);
   };
   const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
      //вышли за пределы
      e.currentTarget.style.opacity = "1";
   };
   const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
      //отпустили перемещение
   };
   const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
      //находимся над другим объектом

      e.preventDefault();
      e.currentTarget.style.opacity = "0.5";
   };
   const dropHandler = (e: DragEvent<HTMLDivElement>, todo: TodolistsDomainType) => {
      // отпустили и ждем действие
      e.preventDefault();
      e.currentTarget.style.opacity = "1";
      const draggedTodoId = e.dataTransfer.getData("string");

      dispatch(todolistThunks.reorderTodolist({ draggableId: draggedTodoId, droppableId: todo.id }));
   };

   return (
      <div
         draggable
         onDragStart={(e) => dragStartHandler(e, props.todolist)}
         onDragLeave={dragLeaveHandler}
         onDragEnd={dragEndHandler}
         onDragOver={dragOverHandler}
         onDrop={(e) => dropHandler(e, props.todolist)}
      >
         <h3>
            <EditableSpan oldTitle={props.todolist.title} collBack={updateTodolistHandler} />
            <IconButton
               aria-label="delete"
               onClick={removeTodolistHandler}
               disabled={props.todolist.entityStatus === "loading"}
            >
               <DeleteIcon />
            </IconButton>
         </h3>
         <AddItemForm collBack={addTaskHandler} disabled={props.todolist.entityStatus === "loading"} />
         <ul>{tasksForTodolist?.map((t) => <Task key={t.id} todolistID={props.todolist.id} taskId={t.id} />)}</ul>
         <div>
            <ButtonWithRedux
               onClick={onAllClickHandler}
               name={"All"}
               color="success"
               variant={props.todolist.filter === "all" ? "outlined" : "contained"}
            />
            <ButtonWithRedux
               onClick={onActiveClickHandler}
               name={"Active"}
               variant={props.todolist.filter === "active" ? "outlined" : "contained"}
            />
            <ButtonWithRedux
               onClick={onCompletedClickHandler}
               name={"Completed"}
               variant={props.todolist.filter === "completed" ? "outlined" : "contained"}
            />
         </div>
      </div>
   );
});
