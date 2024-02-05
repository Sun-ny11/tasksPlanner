import React, { FC, memo } from "react";
import { CheckBox } from "../../management/CheckBox";
import { EditableSpan } from "../../management/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { changeStatusAC, removeTaskAC, updateTaskAC } from "../../../reducers/tasksReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../reducers/store";
import { TaskStatus, TaskType } from "../../../api/todolists-api";

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

   const onChangeHandler = (status: boolean) => {
      dispatch(changeStatusAC(todolistID, taskID, status === true ? TaskStatus.Completed : TaskStatus.New))
   }

   return (
      <li className={task.status ? "is-done" : ""}>

         <CheckBox onChangeCallBack={onChangeHandler} checked={task.status === TaskStatus.Completed ? true : false} />
         <EditableSpan oldTitle={task.title} collBack={newTitleHandler} />

         <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon />
         </IconButton>
      </li>
   );
})