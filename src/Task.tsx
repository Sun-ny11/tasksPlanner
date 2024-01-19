import React, { FC, memo, useCallback } from "react";
import { CheckBox } from "./CheckBox";
import { EditableSpan } from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { changeStatusAC, removeTaskAC, updateTaskAC } from "./reducers/tasksReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TaskType } from "./Todolist";
import { AppRootStateType } from "./reducers/store";

type TaskProps = {
   todolistID: string
   taskID: string
}

export const Task: FC<TaskProps> = memo(({ todolistID, taskID }) => {

   const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID].filter(t => t.id === taskID)[0])
   const dispatch = useDispatch()


   const onClickHandler = () => dispatch(removeTaskAC(todolistID, taskID))

   const newTitleHandler = (title: string) => {
      dispatch(updateTaskAC(todolistID, title, taskID))
   }

   const onChangeHandler = (isDone: boolean) => {
      dispatch(changeStatusAC(todolistID, taskID, isDone))
   }

   return (
      <li className={task.isDone ? "is-done" : ""}>

         <CheckBox onChange={onChangeHandler} checked={task.isDone} />
         <EditableSpan oldTitle={task.title} collBack={newTitleHandler} />

         <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon />
         </IconButton>
      </li>
   );
})