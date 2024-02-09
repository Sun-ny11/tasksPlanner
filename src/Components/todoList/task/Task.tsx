import React, { FC, memo } from "react";
import { CheckBox } from "../../management/CheckBox";
import { EditableSpan } from "../../management/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTaskTC, updateTaskTC } from "../../../reducers/tasksReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../reducers/store";
import { TaskStatus, TaskType } from "../../../api/todolists-api";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type TaskProps = {
   todolistID: string
   taskID: string
}

export const Task: FC<TaskProps> = memo(({ todolistID, taskID }) => {

   const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID].filter(t => t.id === taskID)[0])
   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()


   const onClickHandler = () => dispatch(removeTaskTC(todolistID, taskID))

   const newTitleHandler = (title: string) => {
      dispatch(updateTaskTC(todolistID, { title }, taskID))
   }

   const onChangeHandler = (status: boolean) => {
      dispatch(updateTaskTC(todolistID, { status: status === true ? TaskStatus.Completed : TaskStatus.New }, taskID))
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