import React, { FC, memo } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppRootStateType } from "../../../../reducers/store";
import { TaskType } from "../../../../api/todolists-api";
import { tasksThunks } from "../../../../reducers/tasksReducer";
import { CheckBox } from "../../../management/CheckBox";
import { EditableSpan } from "../../../management/EditableSpan";
import { TaskStatus } from "common/enums/enums";

type TaskProps = {
   todolistID: string;
   taskId: string;
};

export const Task: FC<TaskProps> = memo(({ todolistID, taskId }) => {
   const task = useSelector<AppRootStateType, TaskType>(
      (state) => state.tasks[todolistID].filter((t) => t.id === taskId)[0],
   );
   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

   const onClickHandler = () => dispatch(tasksThunks.removeTask({ todolistID, taskId }));

   const newTitleHandler = (title: string) => {
      dispatch(tasksThunks.updateTask({ todolistID, modelDomain: { title }, taskId: taskId }));
   };

   const onChangeHandler = (status: boolean) => {
      dispatch(
         tasksThunks.updateTask({
            todolistID,
            modelDomain: { status: status === true ? TaskStatus.Completed : TaskStatus.New },
            taskId: taskId,
         }),
      );
   };

   return (
      <li className={task.status ? "is-done" : ""}>
         <CheckBox onChangeCallBack={onChangeHandler} checked={task.status === TaskStatus.Completed ? true : false} />
         <EditableSpan oldTitle={task.title} collBack={newTitleHandler} />

         <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon />
         </IconButton>
      </li>
   );
});
