import { tasksReducer } from "./tasksReducer";
import { TodolistsDomainType, addTodolistAC, getTodolistAC, todolistsReducer } from "./todolistsReducer";
import { taskTodoType } from "../Components/app/App";

test("ids should be equals", () => {
   const startTasksState: taskTodoType = {};
   const startTodolistsState: Array<TodolistsDomainType> = [];

   const newTodo: TodolistsDomainType = {
      id: "1",
      title: "111",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
   };

   const action = addTodolistAC(newTodo);

   const endTasksState = tasksReducer(startTasksState, action);
   const endTodolistsState = todolistsReducer(startTodolistsState, action);

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.payload.todo.id);
   expect(idFromTodolists).toBe(action.payload.todo.id);
});

test("empty arrays should be added when we set todolist", () => {
   const action = getTodolistAC([
      { id: "1", title: "What to learn", addedDate: "", order: 0 },
      { id: "2", title: "What to buy", addedDate: "", order: 0 },
   ]);

   const endState = tasksReducer({}, action);

   const keys = Object.keys(endState);

   expect(keys.length).toBe(2);
   expect(endState["1"]).toStrictEqual([]);
   expect(endState["2"]).toStrictEqual([]);
});
