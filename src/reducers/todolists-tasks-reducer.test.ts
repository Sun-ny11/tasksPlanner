import { v1 } from "uuid";
import { taskTodoType, todolistsType } from "../App";
import { tasksReducer } from "./tasksReducer";
import { addTodolistAC, todolistsReducer } from "./todolistsReducer";

test('ids should be equals', () => {
   const startTasksState: taskTodoType = {};
   const startTodolistsState: Array<todolistsType> = [];

   const action = addTodolistAC("new todolist");

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.payload.todoID);
   expect(idFromTodolists).toBe(action.payload.todoID);
});