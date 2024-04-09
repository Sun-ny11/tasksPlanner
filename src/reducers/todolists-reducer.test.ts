import { action } from "@storybook/addon-actions";
import { RequestType } from "./appReducer";
import {
   FilterValuesType,
   TodolistsDomainType,
   todolistActions,
   todolistThunks,
   todolistsReducer,
} from "./todolistsReducer";
import { v1 } from "uuid";
import { ActionTypeForeTest } from "utils/types/types";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistsDomainType>;

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

   startState = [
      { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
      { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
   ];
});

test("correct todolist should be removed", () => {
   const action: ActionTypeForeTest<typeof todolistThunks.removeTodolist.fulfilled> = {
      type: todolistThunks.removeTodolist.fulfilled.type,
      payload: { todolistID: todolistId1 },
   };

   const endState = todolistsReducer(startState, action);

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
   let newTodolistTitle = "New Todolist";

   const newTodo: TodolistsDomainType = {
      id: "1",
      title: newTodolistTitle,
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
   };

   const action: ActionTypeForeTest<typeof todolistThunks.addTodolist.fulfilled> = {
      type: todolistThunks.addTodolist.fulfilled.type,
      payload: { todo: newTodo },
   };

   const endState = todolistsReducer(startState, action);

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
   let newTodolistTitle = "New Todolist";

   const payload = {
      todolistID: todolistId2,
      title: newTodolistTitle,
   };
   const action: ActionTypeForeTest<typeof todolistThunks.updateTodolist.fulfilled> = {
      type: todolistThunks.updateTodolist.fulfilled.type,
      payload,
   };
   const endState = todolistsReducer(startState, action);

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
   let newFilter: FilterValuesType = "completed";

   const action = {
      type: "CHANGE-TODOLIST-FILTER",
      id: todolistId2,
      filter: newFilter,
   };

   const endState = todolistsReducer(
      startState,
      todolistActions.changeFilter({ todolistID: todolistId2, value: newFilter }),
   );

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {
   const action: ActionTypeForeTest<typeof todolistThunks.getTodolist.fulfilled> = {
      type: todolistThunks.getTodolist.fulfilled.type,
      payload: { todolists: startState },
   };

   const endState = todolistsReducer([], action);

   expect(endState.length).toBe(2);
});

test("correct entityStatus of todolist should be changed", () => {
   let newStatus: RequestType = "loading";

   const endState = todolistsReducer(
      startState,
      todolistActions.changeTodolistEntityStatus({ status: newStatus, todolistID: todolistId2 }),
   );

   expect(endState[0].entityStatus).toBe("idle");
   expect(endState[1].entityStatus).toBe(newStatus);
});
