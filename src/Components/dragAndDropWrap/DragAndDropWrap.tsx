import { AnyAction } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";
import { TodolistsDomainType, todolistThunks } from "features/todolistsLists/model/todolistsSlice";
import React, { DragEvent, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

type Props = {
   children: ReactNode;
   todolist: TodolistsDomainType;
};

export const DragAndDropWrap = ({ children, todolist }: Props) => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   const dragStartHandler = (e: DragEvent<HTMLDivElement>, todo: TodolistsDomainType) => {
      //взяли карту
      e.dataTransfer.setData("string", todo.id);
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
         onDragStart={(e) => dragStartHandler(e, todolist)}
         onDragLeave={dragLeaveHandler}
         onDragEnd={dragEndHandler}
         onDragOver={dragOverHandler}
         onDrop={(e) => dropHandler(e, todolist)}
      >
         {children}
      </div>
   );
};
