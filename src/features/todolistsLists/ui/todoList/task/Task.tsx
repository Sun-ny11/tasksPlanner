import React, { FC, memo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { tasksThunks } from "../../../model/tasksSlice";
import { CheckBox } from "../../../../../Components/checkBox/CheckBox";
import { EditableSpan } from "../../../../../Components/editableSpan/EditableSpan";
import { TaskStatus } from "common/enums/enums";
import { currentTask } from "features/todolistsLists/model/tasksSelectors";
import s from "./Task.module.css";

type Props = {
   todolistID: string;
   taskId: string;
};

export const Task = memo(({ todolistID, taskId }: Props) => {
   const task = useSelector(currentTask(todolistID, taskId));

   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

   const removeTaskHandler = () => dispatch(tasksThunks.removeTask({ todolistID, taskId }));

   const updateTaskTitleHandler = (title: string) => {
      dispatch(tasksThunks.updateTask({ todolistID, modelDomain: { title }, taskId: taskId }));
   };

   const updateTaskStatusHandler = (status: boolean) => {
      dispatch(
         tasksThunks.updateTask({
            todolistID,
            modelDomain: { status: status ? TaskStatus.Completed : TaskStatus.New },
            taskId: taskId,
         }),
      );
   };

   return (
      <li className={task.status ? s.isDone : ""}>
         <CheckBox onChangeCallBack={updateTaskStatusHandler} checked={task.status === TaskStatus.Completed} />
         <EditableSpan oldTitle={task.title} collBack={updateTaskTitleHandler} />

         <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <DeleteIcon />
         </IconButton>
      </li>
   );
});
