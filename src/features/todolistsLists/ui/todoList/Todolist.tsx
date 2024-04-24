import React, { memo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { TodolistsDomainType } from "../../model/todolistsSlice";
import { AppRootStateType } from "../../../../app/store";
import { tasksThunks } from "../../model/tasksSlice";
import { AddItemForm } from "../../../../Components/addItemForm/AddItemForm";
import { DragAndDropWrap } from "Components/dragAndDropWrap/DragAndDropWrap";
import { FilterTasksButtons } from "./FilterTasksButtons";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";

type Props = {
   todolist: TodolistsDomainType;
   demo?: boolean;
};

export const Todolist = memo(({ demo = false, todolist }: Props) => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   useEffect(() => {
      if (demo) {
         return;
      }
      dispatch(tasksThunks.fetchTask(todolist.id));
   }, []);

   /**
    *
    * @param title
    * @returns - промис для AddItemForm
    * @unwrap - санка всегда резолвится если созданна через createAsyncThunk, unwrap вернет привычную логику
    *
    */
   const addTaskHandler = (title: string) => {
      return dispatch(tasksThunks.addTask({ todolistID: todolist.id, title })).unwrap();
   };

   return (
      <DragAndDropWrap todolist={todolist}>
         <TodolistTitle todolist={todolist} />
         <AddItemForm collBack={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
         <Tasks todolist={todolist} />
         <div>
            <FilterTasksButtons todolist={todolist} />
         </div>
      </DragAndDropWrap>
   );
});
