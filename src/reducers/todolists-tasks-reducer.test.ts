import { tasksReducer } from "./tasksReducer";
import { TodolistsDomainType, addTodolistAC, todolistsReducer } from "./todolistsReducer";
import { taskTodoType } from "../AppWidthRedux";

test('ids should be equals', () => {
   const startTasksState: taskTodoType = {};
   const startTodolistsState: Array<TodolistsDomainType> = [];

   const action = addTodolistAC("new todolist");

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.payload.todoID);
   expect(idFromTodolists).toBe(action.payload.todoID);
});