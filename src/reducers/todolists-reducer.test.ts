import { FilterValuesType, TodolistsDomainType, addTodolistAC, changeFilterAC, getTodolistAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './todolistsReducer';
import { v1 } from 'uuid';

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistsDomainType>

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

   startState = [
      { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "all" },
      { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "all" }
   ]
})



test('correct todolist should be removed', () => {


   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

   let newTodolistTitle = "New Todolist";

   const newTodo: TodolistsDomainType = { id: "1", title: newTodolistTitle, addedDate: "", order: 0, filter: 'all' }


   const endState = todolistsReducer(startState, addTodolistAC(newTodo))

   expect(endState.length).toBe(3);
   expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

   let newTodolistTitle = "New Todolist";



   const action = {
      type: 'CHANGE-TODOLIST-TITLE',
      id: todolistId2,
      title: newTodolistTitle
   };

   const endState = todolistsReducer(startState, updateTodolistAC(action.id, action.title));

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

   let newFilter: FilterValuesType = "completed";



   const action = {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistId2,
      filter: newFilter
   };

   const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});



test('todolists should be set to the state', () => {

   const action = getTodolistAC(startState)

   const endState = todolistsReducer([], action);

   expect(endState.length).toBe(2);
});