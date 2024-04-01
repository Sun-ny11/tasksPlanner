import { RequestType } from "./appReducer";
import { FilterValuesType, TodolistsDomainType, todolistActions, todolistsReducer } from "./todolistsReducer";
import { v1 } from "uuid";

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
   const endState = todolistsReducer(startState, todolistActions.removeTodolist({ todolistID: todolistId1 }));

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

   const endState = todolistsReducer(startState, todolistActions.addTodolist({ todo: newTodo }));

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
   let newTodolistTitle = "New Todolist";

   const action = {
      type: "CHANGE-TODOLIST-TITLE",
      id: todolistId2,
      title: newTodolistTitle,
   };

   const endState = todolistsReducer(
      startState,
      todolistActions.updateTodolist({ todolistID: action.id, title: action.title }),
   );

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
   const action = todolistActions.getTodolist({ todolists: startState });

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
